"use client";
import { signIn } from "@/lib/authOptions";
import { useSearchParams } from "next/navigation";

export default function GithubLoginPage() {
    const searchParams = useSearchParams();
    signIn("google", { callbackUrl: searchParams.get('callbackUrl') || "/" })
}