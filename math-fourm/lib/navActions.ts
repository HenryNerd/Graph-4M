"use server";
import { redirect } from "next/navigation";
import { signOut } from "@/auth";

export async function goToExplore() {
    redirect("/");
}

export async function goToEditor(username: string) {
    if (username === "Guest") {
        redirect("/login");
    } else {
        redirect("/editor");
    }
}

export async function goToLogin() {
    redirect("/login");
}

export async function goToSignup() {
    redirect("/signup");
}

export async function signOutLib() {
    await signOut({ redirectTo: "/" });
}