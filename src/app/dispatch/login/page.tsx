"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole } from "lucide-react";

import Logo from "@/components/Logo";
import PageContainer from "@/components/PageContainer";
import Card from "@/components/Card";
import PrimaryButton from "@/components/PrimaryButton";
import TextInput from "@/components/TextInput";

export default function DispatchLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const response = await fetch("/api/dispatch-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!response.ok) {
      const body = await response.json().catch(() => null);
      alert(body?.error || "Unable to sign in.");
      return;
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    router.replace(nextPath || "/dispatch");
  }

  return (
    <PageContainer showBeta={false}>
      <div className="flex min-h-[calc(100dvh-80px)] flex-col justify-center">
        <Logo size={150} className="mx-auto" />

        <Card className="mt-6">
          <form onSubmit={login} className="space-y-5">
            <div className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#19C6FF]/35 bg-[#0A84FF]/20 text-[#19C6FF]">
                <LockKeyhole size={26} />
              </div>

              <h1 className="mt-4 text-3xl font-black text-white">
                Dispatch Login
              </h1>

              <p className="mt-2 text-sm font-semibold leading-relaxed text-white/60">
                Authorized LakeNow dispatchers only.
              </p>
            </div>

            <TextInput
              label="Password"
              placeholder="Enter dispatch password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <PrimaryButton type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Open Dispatch"}
            </PrimaryButton>
          </form>
        </Card>
      </div>
    </PageContainer>
  );
}
