"use server";

import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {
    KEYSTATIC_COOKIE,
    createSession,
    passwordMatches,
} from "@/lib/keystatic-gate";

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    path: "/",
    maxAge: 12*60*60,
};

/* giriş formu. doğru hesapta çerezi yazar ve panele yollar */
export async function signInKeystatic(formData: FormData) {
    const user = String(formData.get("user") ?? "");
    const password = String(formData.get("password") ?? "");


if (!passwordMatches(user, password)) {
    redirect("/panel-giris?hata=1");
}

const session = createSession(user);
if (!session) {
    redirect("/panel-giris?hata=1");
}

const jar = await cookies();
jar.set(KEYSTATIC_COOKIE, session, cookieOptions);
redirect("/keystatic");
}

/* Ortak bilgisayarda oturumu kapatır */
export async function signOutKeystatic() {
    const jar = await cookies();
    jar.delete(KEYSTATIC_COOKIE);
    redirect("/panel-giris");
}