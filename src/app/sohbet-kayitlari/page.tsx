import type { Metadata } from "next";
import Link from "next/link";
import { listChatLogs, type ChatSheetRow } from "@/lib/chat-log";

export const metadata: Metadata = {
  title: "Sohbet kayıtları",
  robots: { index: false, follow: false },
};

/** Aynı sohbet (no) bir blok. Neon chat_sheet sırası. */
function groupByChat(rows: ChatSheetRow[]): ChatSheetRow[][] {
  const groups: ChatSheetRow[][] = [];
  let current: ChatSheetRow[] = [];
  for (const row of rows) {
    const last = current[0];
    if (last && last.no !== row.no) {
      groups.push(current);
      current = [];
    }
    current.push(row);
  }
  if (current.length) groups.push(current);
  return groups;
}

export default async function ChatLogsPage() {
  let rows: ChatSheetRow[] = [];
  let failed = false;
  try {
    rows = await listChatLogs();
  } catch (error) {
    console.error("sohbet-kayitlari", error);
    failed = true;
  }

  const chats = groupByChat(rows);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <p className="text-xs font-semibold tracking-[0.22em] text-brand-orange uppercase">
        Panel
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight">
        Sohbet kayıtları
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        Son 2 gün. Aynı sohbet aynı numara. Soru ve cevap yan yana.
      </p>
      <p className="mt-4 flex flex-wrap gap-4 text-sm">
        <Link
          href="/keystatic"
          className="underline underline-offset-2 hover:text-brand-orange"
        >
          İçerik paneli
        </Link>
        <Link
          href="/panel-giris"
          className="underline underline-offset-2 hover:text-brand-orange"
        >
          Giriş / çıkış
        </Link>
      </p>

      {failed ? (
        <p className="mt-8 text-sm text-destructive">
          Kayıtlar okunamadı. DATABASE_URL ve chat_sheet görünümünü kontrol et.
        </p>
      ) : chats.length === 0 ? (
        <p className="mt-8 text-sm text-muted-foreground">Kayıt yok.</p>
      ) : (
        <div className="mt-8 overflow-x-auto">
          {chats.map((chat) => (
            <table
              key={chat[0]?.no}
              className="mb-8 w-full min-w-[40rem] border-collapse text-left text-sm"
            >
              <thead>
                <tr className="border-b border-border text-xs text-muted-foreground">
                  <th className="px-2 py-2 font-medium">no</th>
                  <th className="px-2 py-2 font-medium">session_id</th>
                  <th className="px-2 py-2 font-medium">id</th>
                  <th className="px-2 py-2 font-medium">ip</th>
                  <th className="px-2 py-2 font-medium">question</th>
                  <th className="px-2 py-2 font-medium">answer</th>
                </tr>
              </thead>
              <tbody>
                {chat.map((row) => (
                  <tr
                    key={row.n}
                    className="border-b border-border/70 align-top"
                  >
                    <td className="whitespace-nowrap px-2 py-2 tabular-nums">
                      {row.no}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 font-mono text-xs">
                      {row.session_id ?? ""}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 tabular-nums">
                      {row.id ?? ""}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 font-mono text-xs">
                      {row.ip ?? ""}
                    </td>
                    <td className="max-w-sm whitespace-pre-wrap px-2 py-2">
                      {row.question}
                    </td>
                    <td className="max-w-md whitespace-pre-wrap px-2 py-2">
                      {row.answer}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ))}
        </div>
      )}
    </main>
  );
}
