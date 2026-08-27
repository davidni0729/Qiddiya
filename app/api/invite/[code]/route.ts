import { NextResponse } from "next/server";
import { initializeDb } from "@/lib/db";

type InviteRow = {
  source_name: string;
  audience_type: string;
  quota: number;
  used_count: number;
  is_active: number;
  expires_at: string | null;
};

export async function GET(_request: Request, context: { params: Promise<{ code: string }> }) {
  const { code } = await context.params;
  const normalizedCode = code.trim().toUpperCase();

  if (!/^[A-Z0-9_-]{4,32}$/.test(normalizedCode)) {
    return NextResponse.json({ valid: false }, { status: 400 });
  }

  const db = await initializeDb();
  const invite = await db.prepare(
    `SELECT source_name, audience_type, quota, used_count, is_active, expires_at
     FROM invite_codes WHERE code = ?`
  ).bind(normalizedCode).first<InviteRow>();

  const expired = invite?.expires_at ? new Date(invite.expires_at).getTime() < Date.now() : false;
  const full = invite ? invite.quota > 0 && invite.used_count >= invite.quota : false;
  const valid = Boolean(invite && invite.is_active === 1 && !expired && !full);

  return NextResponse.json({
    valid,
    sourceName: valid ? invite?.source_name : undefined,
    audienceType: valid ? invite?.audience_type : undefined,
    reason: !invite ? "not_found" : expired ? "expired" : full ? "full" : invite.is_active !== 1 ? "inactive" : undefined,
  });
}
