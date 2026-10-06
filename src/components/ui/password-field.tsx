"use client";

import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

/** şifre kutusu. sağdaki göz yazıyı gösterir veya gizler */
export function PasswordField() {
    const [visible, setVisible] = useState(false);

    return (
        <label className="flex flex-col gap-1 text-sm">Şifre
        <span className="relative block">
            <input
            name="password"
            type={visible ? "text" : "password"}
            autoComplete="current-password"
            required
            className="w-full rounded-md border border-current/20 bg-transparent py-2 pr-10 pl-3"
            />
            <button
            type="button"
            onClick={()=> setVisible((open) => !open)}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 opacity-70 hover:opacity-100 active:opacity-100"
            aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
            >
                {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
        </span>
        </label>
    );
}