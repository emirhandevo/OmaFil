import {neon} from "@neondatabase/serverless";

function db() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL yok");
    return neon(url);
}

/** Aynı session_id tek satır. chat_sheet bu satırı yan yana soru-cevap satırlarına böler. */
export async function saveChatLog(row:{
    ip: string;
    locale: string;
    question: string;
    answer: string;
    // Aynı sekmenin kodu. Aynı kod = aynı sohbet.
    sessionId: string;
}) {
    // Soru ve cevap aynı sırada durur. chat_sheet 1. 2. 3. yazar, araya yıldız satırı koyar.
    const gap = "\n*****\n";
    try {
        const sql = db();
        if (row.sessionId) {
            await sql`
            insert into chat_logs (ip, locale, question, answer, session_id)
            values (${row.ip}, ${row.locale}, ${row.question}, ${row.answer}, ${row.sessionId})
            on conflict (session_id) where session_id is not null and session_id <> ''
            do update set
              question = chat_logs.question || ${gap} || excluded.question,
              answer = chat_logs.answer || ${gap} || excluded.answer
            `;
        } else {
            // Kod yoksa turu tek başına yaz. Boş kodlar birbirine karışmasın.
            await sql`
            insert into chat_logs (ip, locale, question, answer, session_id)
            values (${row.ip}, ${row.locale}, ${row.question}, ${row.answer}, ${row.sessionId})
            `;
        }
        await sql`
        delete from chat_logs
        where created_at < now() - interval '2 days'
        `;
    } catch (error) {
     console.error("chat-logs", error);
     }
}

export type ChatSheetRow = {
    no: number;
    n: number;
    session_id: string | null;
    id: number | null;
    ip: string | null;
    question: string;
    answer: string;
};

/** Panel listesi. Neon’daki chat_sheet: numaralı soru-cevap, yıldız satırı. */
export async function listChatLogs(): Promise<ChatSheetRow[]> {
    return db()`
    select no, n, session_id, id, ip, question, answer
    from chat_sheet
    order by n
    limit 2000
    ` as Promise<ChatSheetRow[]>;
}
