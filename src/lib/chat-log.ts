import {neon} from "@neondatabase/serverless";

function db() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL yok");
    return neon(url);
}

/** Aynı session_id tek satır. Yeni tur o satırın altına eklenir. Kayıt düşerse sohbet yine cevap verir. */
export async function saveChatLog(row:{
    ip: string;
    locale: string;
    question: string;
    answer: string;
    // Aynı sekmenin kodu. Aynı kod = aynı sohbet.
    sessionId: string;
}) {
    // Soru, hemen altında cevabı. Sonraki turdan önce bir boş satır.
    const block = `Soru: ${row.question}\nCevap: ${row.answer}`;
    try {
        const sql = db();
        if (row.sessionId) {
            await sql`
            insert into chat_logs (ip, locale, question, answer, session_id)
            values (${row.ip}, ${row.locale}, ${row.question}, ${block}, ${row.sessionId})
            on conflict (session_id) where session_id is not null and session_id <> ''
            do update set
              question = chat_logs.question || ${"\n"} || excluded.question,
              answer = chat_logs.answer || ${"\n\n"} || excluded.answer
            `;
        } else {
            // Kod yoksa turu tek başına yaz. Boş kodlar birbirine karışmasın.
            await sql`
            insert into chat_logs (ip, locale, question, answer, session_id)
            values (${row.ip}, ${row.locale}, ${row.question}, ${block}, ${row.sessionId})
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

/** Panel listesi. Son 2 gün, en yeni kayıt üstte. */
export async function listChatLogs() {
    return db()`
    select id, created_at, session_id, ip, locale, question, answer
    from chat_logs
    where created_at > now() - interval '2 days'
    order by created_at desc
    limit 500
    `;
}
