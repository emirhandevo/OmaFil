import {signInKeystatic, signOutKeystatic} from "@/app/actions/keystatic-auth";
import { PasswordField } from "@/components/ui/password-field"; 

type Props = {
    searchParams: Promise<{hata?: string}>;
};

export default async function PanelGirisPage({searchParams}: Props) {
    const query = await searchParams;
    const failed = query.hata === "1";

    return (
        <main className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
            <h1 className="text-2xl font-semibold">İçerik Paneli</h1>
            <p className="mt-2 text-sm opacity-80">Developer ve patronlar aynı kullanıcı adıyla giriş yapar.</p>

            {failed ? (
              <p className="mt-4 text-sm text-red-700">Kullanıcı adı veya şifre hatalı.</p>  ) : null }

              <form action={signInKeystatic} className="mt-6 flex flex-col gap-3"> 
              <label className="flex flex-col gap-1 text-sm">
              Kullanıcı Adı
                <input 
                name="user"
                autoComplete="username"
                required
                className="rounded-md border border-current/20 bg-transparent px-3 py-2"
                />
                </label>
                <PasswordField />
                <button type="submit" className="rounded-md bg-neutral-900 px-3 py-2 text-white transition-opacity active:opacity-80">Giriş</button>
              </form>

              <p className="mt-6 text-sm">
                <a
                  href="/sohbet-kayitlari"
                  className="underline underline-offset-2 hover:text-brand-orange"
                >
                  Sohbet kayıtları
                </a>
              </p>

              <form action={signOutKeystatic} className="mt-6">
                <button type="submit" className="text-sm underline active:text-brand-orange">Çıkış</button>
              </form>
        </main>
    );
}