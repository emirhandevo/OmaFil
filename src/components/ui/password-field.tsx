"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

/** Şifre kutusu. Göz butonu type=password / text değiştirir. */
export function PasswordField() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col gap-1 text-sm">
      <label htmlFor="panel-password">Şifre</label>
      <span className="relative block">
        <input
          id="panel-password"
          name="password"
          type={visible ? "text" : "password"}
          autoComplete="current-password"
          required
          className="w-full rounded-md border border-current/20 bg-transparent py-2 pr-10 pl-3 [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
        />
        {/* type="button": forma submit olmasın. z-10: input tıklamayı yemesin. */}
        <button
          type="button"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setVisible((open) => !open);
          }}
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 rounded p-1 opacity-70 hover:opacity-100 active:opacity-100"
          aria-label={visible ? "Şifreyi gizle" : "Şifreyi göster"}
          aria-pressed={visible}
        >
          {visible ? (
            <EyeOff aria-hidden="true" className="size-4" />
          ) : (
            <Eye aria-hidden="true" className="size-4" />
          )}
        </button>
      </span>
    </div>
  );
}
