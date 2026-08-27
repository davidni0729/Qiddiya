import { NextResponse } from "next/server";
import { initializeDb } from "@/lib/db";

type RegistrationPayload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  instagram?: unknown;
  city?: unknown;
  interests?: unknown;
  source?: unknown;
  inviteCode?: unknown;
  privacyConsent?: unknown;
  marketingConsent?: unknown;
};

type ExistingRow = { reference_code: string; status: string };
type InviteRow = { audience_type: string; quota: number; used_count: number; is_active: number; expires_at: string | null };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const allowedSources = new Set(["instagram", "facebook", "friend", "dj-kol", "mclub", "brand", "media", "other", "invite"]);
const allowedInterests = new Set(["light-art", "electronic-music", "sustainability", "installation", "vvip", "brand-collab"]);

function textValue(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function createReferenceCode() {
  const signal = crypto.randomUUID().replaceAll("-", "").slice(0, 8).toUpperCase();
  return `QD-26-${signal}`;
}

export async function POST(request: Request) {
  let body: RegistrationPayload;
  try {
    body = await request.json() as RegistrationPayload;
  } catch {
    return NextResponse.json({ error: "資料格式不正確。" }, { status: 400 });
  }

  const name = textValue(body.name, 80);
  const email = textValue(body.email, 160).toLowerCase();
  const phone = textValue(body.phone, 40);
  const instagram = textValue(body.instagram, 80).replace(/^@/, "");
  const city = textValue(body.city, 80);
  const source = textValue(body.source, 40);
  const inviteCode = textValue(body.inviteCode, 32).toUpperCase();
  const interests = Array.isArray(body.interests)
    ? body.interests.filter((item): item is string => typeof item === "string" && allowedInterests.has(item)).slice(0, 6)
    : [];

  if (name.length < 2) return NextResponse.json({ error: "請填寫姓名。" }, { status: 422 });
  if (!emailPattern.test(email)) return NextResponse.json({ error: "請填寫有效的 Email。" }, { status: 422 });
  if (!allowedSources.has(source)) return NextResponse.json({ error: "請選擇得知活動的方式。" }, { status: 422 });
  if (body.privacyConsent !== true) return NextResponse.json({ error: "送出前請同意隱私權聲明。" }, { status: 422 });

  const db = await initializeDb();
  const existing = await db.prepare(
    "SELECT reference_code, status FROM registrations WHERE email = ?"
  ).bind(email).first<ExistingRow>();

  if (existing) {
    return NextResponse.json({ ok: true, duplicate: true, referenceCode: existing.reference_code, status: existing.status });
  }

  let audienceType = "general";
  let invite: InviteRow | null = null;

  if (inviteCode) {
    invite = await db.prepare(
      `SELECT audience_type, quota, used_count, is_active, expires_at
       FROM invite_codes WHERE code = ?`
    ).bind(inviteCode).first<InviteRow>();
    const expired = invite?.expires_at ? new Date(invite.expires_at).getTime() < Date.now() : false;
    const full = invite ? invite.quota > 0 && invite.used_count >= invite.quota : false;
    if (!invite || invite.is_active !== 1 || expired || full) {
      return NextResponse.json({ error: "此邀請碼無效、已到期或名額已滿。" }, { status: 422 });
    }
    audienceType = invite.audience_type;
  }

  const id = crypto.randomUUID();
  const referenceCode = createReferenceCode();
  const insert = db.prepare(
    `INSERT INTO registrations
      (id, reference_code, name, email, phone, instagram, city, interests, source, invite_code, audience_type, privacy_consent, marketing_consent, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?, 'registered')`
  ).bind(
    id, referenceCode, name, email, phone || null, instagram || null, city || null,
    JSON.stringify(interests), source, inviteCode || null, audienceType, body.marketingConsent === true ? 1 : 0,
  );

  try {
    if (inviteCode && invite) {
      await db.batch([
        insert,
        db.prepare(
          `UPDATE invite_codes SET used_count = used_count + 1
           WHERE code = ? AND is_active = 1 AND (quota = 0 OR used_count < quota)`
        ).bind(inviteCode),
      ]);
    } else {
      await insert.run();
    }
  } catch (error) {
    console.error("Registration write failed", error);
    return NextResponse.json({ error: "訊號暫時中斷，請稍後再試。" }, { status: 500 });
  }

  return NextResponse.json({ ok: true, duplicate: false, referenceCode, status: "registered", audienceType }, { status: 201 });
}
