import { redirect } from "next/navigation";

export default async function InviteEntry({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  redirect(`/register?invite=${encodeURIComponent(code)}`);
}
