"use client";
import { signIn } from "@/lib/authOptions";
import { useSearchParams } from "next/navigation";

export default function GithubLoginPage() {
    const searchParams = useSearchParams();
    signIn("github", { callbackUrl: searchParams.get('callbackUrl') || "/" })
}