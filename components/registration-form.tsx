"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, LoaderCircle, Radio, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const interestOptions = [
  { value: "light-art", label: "光雕與沉浸影像" },
  { value: "electronic-music", label: "電子音樂" },
  { value: "sustainability", label: "永續與未來城市" },
  { value: "installation", label: "裝置藝術" },
  { value: "vvip", label: "VVIP 限定體驗" },
  { value: "brand-collab", label: "品牌合作" },
];

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
  instagram: string;
  interests: string[];
  source: string;
  privacyConsent: boolean;
  marketingConsent: boolean;
};

const initialForm: FormData = {
  name: "", email: "", phone: "", city: "", instagram: "", interests: [], source: "",
  privacyConsent: false, marketingConsent: false,
};

export function RegistrationForm({ inviteCode = "" }: { inviteCode?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [inviteState, setInviteState] = useState<"none" | "checking" | "valid" | "invalid">(inviteCode ? "checking" : "none");
  const [inviteSource, setInviteSource] = useState("");

  useEffect(() => {
    if (!inviteCode) return;
    let active = true;
    fetch(`/api/invite/${encodeURIComponent(inviteCode)}`)
      .then((response) => response.json() as Promise<{ valid: boolean; sourceName?: string }>)
      .then((result) => {
        if (!active) return;
        setInviteState(result.valid ? "valid" : "invalid");
        setInviteSource(result.sourceName ?? "");
      })
      .catch(() => active && setInviteState("invalid"));
    return () => { active = false; };
  }, [inviteCode]);

  function update<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError("");
  }

  function toggleInterest(value: string) {
    const next = form.interests.includes(value)
      ? form.interests.filter((item) => item !== value)
      : [...form.interests, value];
    update("interests", next);
  }

  function validateCurrentStep() {
    if (step === 0) {
      if (form.name.trim().length < 2) return "請填寫姓名。";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "請填寫有效的 Email。";
    }
    if (step === 1) {
      if (form.interests.length === 0) return "至少選擇一項感興趣的體驗。";
      if (!form.source) return "請選擇得知活動的方式。";
    }
    if (step === 2 && !form.privacyConsent) return "送出前請同意隱私權聲明。";
    return "";
  }

  function nextStep() {
    const validationError = validateCurrentStep();
    if (validationError) return setError(validationError);
    setStep((current) => Math.min(2, current + 1));
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const validationError = validateCurrentStep();
    if (validationError) return setError(validationError);
    if (inviteState === "checking") return setError("邀請訊號仍在確認中，請稍候。 ");
    if (inviteState === "invalid") return setError("邀請碼無效或已失效，請返回一般登記入口。 ");

    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, inviteCode: inviteState === "valid" ? inviteCode : "" }),
      });
      const result = await response.json() as { error?: string; referenceCode?: string; duplicate?: boolean };
      if (!response.ok || !result.referenceCode) throw new Error(result.error || "訊號暫時中斷，請稍後再試。");
      const query = new URLSearchParams({ ref: result.referenceCode, duplicate: result.duplicate ? "1" : "0" });
      router.push(`/register/complete?${query.toString()}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "訊號暫時中斷，請稍後再試。");
      setSubmitting(false);
    }
  }

  return (
    <form className="registration-form" onSubmit={submit} noValidate>
      <div className="form-progress" aria-label={`登記進度：第 ${step + 1} 步，共 3 步`}>
        {["基本資料", "體驗偏好", "確認送出"].map((label, index) => (
          <div key={label} className={index <= step ? "active" : ""}>
            <span>{index < step ? <Check size={13} aria-hidden="true" /> : `0${index + 1}`}</span>
            <small>{label}</small>
          </div>
        ))}
      </div>

      {inviteCode && (
        <div className={`invite-status ${inviteState}`} role="status">
          {inviteState === "checking" && <LoaderCircle className="spin" size={18} aria-hidden="true" />}
          {inviteState === "valid" && <Radio size={18} aria-hidden="true" />}
          {inviteState === "invalid" && <span aria-hidden="true">!</span>}
          <div>
            <strong>{inviteState === "checking" ? "確認邀請訊號" : inviteState === "valid" ? "優先訊號已啟用" : "邀請訊號無效"}</strong>
            <small>{inviteState === "valid" ? `${inviteSource} / ${inviteCode.toUpperCase()}` : inviteState === "invalid" ? "可改由一般登記入口加入名單" : inviteCode.toUpperCase()}</small>
          </div>
        </div>
      )}

      {step === 0 && (
        <fieldset>
          <legend><span>STEP 01</span>留下你的接收座標</legend>
          <p className="field-intro">我們將透過 Email 傳送活動日期、場域與正式參與辦法。</p>
          <div className="field-grid">
            <label className="field"><span>姓名 *</span><input autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="你的姓名" /></label>
            <label className="field"><span>Email *</span><input type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="name@example.com" /></label>
            <label className="field"><span>手機</span><input type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder="選填" /></label>
            <label className="field"><span>所在城市</span><input autoComplete="address-level2" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="例如：台北" /></label>
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset>
          <legend><span>STEP 02</span>校準你的未來偏好</legend>
          <p className="field-intro">選擇你希望優先收到的體驗訊號，可複選。</p>
          <div className="interest-grid">
            {interestOptions.map((option) => (
              <label key={option.value} className={form.interests.includes(option.value) ? "interest active" : "interest"}>
                <input type="checkbox" checked={form.interests.includes(option.value)} onChange={() => toggleInterest(option.value)} />
                <span className="check-box">{form.interests.includes(option.value) && <Check size={14} aria-hidden="true" />}</span>
                {option.label}
              </label>
            ))}
          </div>
          <div className="field-grid field-grid-lower">
            <label className="field"><span>你從哪裡得知 Qiddiya？ *</span>
              <select value={form.source} onChange={(e) => update("source", e.target.value)}>
                <option value="">請選擇</option><option value="instagram">Instagram</option><option value="facebook">Facebook</option><option value="friend">朋友推薦</option><option value="dj-kol">DJ / KOL</option><option value="mclub">MClub</option><option value="brand">合作品牌</option><option value="media">媒體報導</option><option value="invite">私人邀請</option><option value="other">其他</option>
              </select>
            </label>
            <label className="field"><span>Instagram</span><div className="prefixed-input"><b>@</b><input value={form.instagram} onChange={(e) => update("instagram", e.target.value.replace(/^@/, ""))} placeholder="帳號（選填）" /></div></label>
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset>
          <legend><span>STEP 03</span>確認你的接收訊號</legend>
          <div className="review-block">
            <div><small>姓名</small><strong>{form.name}</strong></div><div><small>Email</small><strong>{form.email}</strong></div>
            <div><small>體驗偏好</small><strong>{form.interests.map((value) => interestOptions.find((option) => option.value === value)?.label).join("、")}</strong></div>
          </div>
          <label className="consent-row"><input type="checkbox" checked={form.privacyConsent} onChange={(e) => update("privacyConsent", e.target.checked)} /><span className="check-box">{form.privacyConsent && <Check size={14} aria-hidden="true" />}</span><span>我已閱讀並同意 <Link href="/privacy" target="_blank">隱私權聲明</Link>，同意為本次活動聯繫目的提供資料。*</span></label>
          <label className="consent-row"><input type="checkbox" checked={form.marketingConsent} onChange={(e) => update("marketingConsent", e.target.checked)} /><span className="check-box">{form.marketingConsent && <Check size={14} aria-hidden="true" />}</span><span>我願意接收 TianYen 後續光影、音樂與文化活動資訊。</span></label>
          <div className="registration-note"><ShieldCheck size={20} strokeWidth={1.5} aria-hidden="true" /><p><strong>這是預先登記，不是門票。</strong>完成登記代表加入優先通知名單；正式日期、票務與入場方式將另行公告。</p></div>
        </fieldset>
      )}

      <p className="form-error" role="alert" aria-live="polite">{error}</p>
      <div className="form-actions">
        {step > 0 ? <button className="form-back" type="button" onClick={() => { setStep((current) => current - 1); setError(""); }}><ArrowLeft size={18} aria-hidden="true" />上一步</button> : <span />}
        {step < 2 ? <button className="form-next" type="button" onClick={nextStep}>下一步<ArrowRight size={18} aria-hidden="true" /></button> : <button className="form-next" type="submit" disabled={submitting}>{submitting ? <><LoaderCircle className="spin" size={18} aria-hidden="true" />傳送訊號中</> : <>完成預先登記<ArrowRight size={18} aria-hidden="true" /></>}</button>}
      </div>
    </form>
  );
}
