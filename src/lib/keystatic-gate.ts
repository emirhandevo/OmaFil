import { createHmac, timingSafeEqual } from "node:crypto";

/* panel oturum çerezi. şifre bu çerezin içinde durmaz */
export const KEYSTATIC_COOKIE = "ks-session";

/* oturum 12 saat açık kalır */
const SESSION_MS = 12*60*60*1000;

type Account = {
    user: string;
    password: string;
};

/* tek hesap. ben ve patronlar aynı adı ve şifreyi kullanır */
function account(): Account | null {
    const user= process.env.KEYSTATIC_USER?.trim() ?? "";
    const password = process.env.KEYSTATIC_PASSWORD ?? "";
    if (!user || !password) return null;
    return {user, password};
}

function secret(): string | null {
    const value= process.env.KEYSTATIC_SESSION_SECRET?.trim();
    return value ? value : null;
}

/* canlıda hesap ve imza anahtarı şart. biri eksikse panel kapalı kalır */
function configured(): boolean {
    return account() !== null && secret() !== null;    
}

function sign(body:string): string | null {
    const key = secret();
    if (!key) return null;
    return createHmac("sha256", key).update(body).digest("base64url")
}

function safeEqual(left: string, right: string): boolean {
    const a = Buffer.from(left);
    const b = Buffer.from(right);
    if (a.length !== b.length) return false;
    return timingSafeEqual(a,b);
}

/* ad ve şifre tek hesaba uyuyor mu */
export function passwordMatches(user: string, password: string): boolean {
    const name = user.trim().slice(0, 80);
    const pass = password.slice(0, 200);
    const saved = account();
    if (!saved) return false;
    return safeEqual(name, saved.user) && safeEqual(pass, saved.password);
}

/* imzalı çerez. içinde yalnızca kullanıcı adı ve bitiş anı var */
export function createSession(user: string): string | null {
    const body = Buffer.from(
        JSON.stringify({user: user.trim(), exp: Date.now() + SESSION_MS}),
    ).toString("base64url");
    const mac = sign(body);
    if (!mac) return null;
    return `${body}.${mac}`;
}

/* çerez bizden mi?, süresi dolmuş mu, adı hala bu hesap mı? */
export function sessionIsValid(token: string | undefined):boolean {
    if(!token) return false;
    const dot = token.lastIndexOf(".");
    if (dot <= 0) return false;

    const body = token.slice(0, dot);
    const mac = token.slice(dot + 1);
    const expected = sign(body);
    if (!expected || !safeEqual(mac, expected)) return false;

    try {
        const parsed = JSON.parse(Buffer.from(body, "base64url").toString("utf8")) as {
            user?: string;
            exp?: number;
        };
        if (!parsed.user ||typeof parsed.exp !== "number") return false;
        if (parsed.exp < Date.now()) return false;
       const saved = account();
        return saved !== null && saved.user === parsed.user;
    } catch {
        return false; 
    }
} 

/**
 * panel sayfası ve /api/keystatic bu fonksiyona bakar
 * anahtarlar boşken yerel geliştirme açık kalır. 
 * canlıda anahtar eksikse kapı kapalı kalır
 */
export function panelAllows(token: string | undefined):boolean {
    if (!configured()) {
        return process.env.NODE_ENV !== "production";
    }
    return sessionIsValid(token);
}