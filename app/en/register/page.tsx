import type { Metadata } from "next";
import { RegisterPage } from "@/components/register-page";

export const metadata: Metadata = {
  title: { absolute: "Pre-register | Qiddiya" },
  description: "Receive the first Qiddiya future light and music signal.",
  alternates: {
    canonical: "https://davidni0729.github.io/Qiddiya/en/register/",
    languages: { "zh-Hant": "https://davidni0729.github.io/Qiddiya/register/", en: "https://davidni0729.github.io/Qiddiya/en/register/" },
  },
};

export default function EnglishRegisterPage() {
  return <RegisterPage locale="en" />;
}
