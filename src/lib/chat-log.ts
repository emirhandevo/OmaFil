import {neon} from "@neondatabase/serverless";

function db() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL yok");
    return neon(url);
}

/** Her soru-cevap bir satır. 2 günden eski satırlar silinir. Kayıt düşerse sohbet yine cevap verir. */
export async function saveChatLog(row:{
    ip: string;
    locale: string;
    question: string;
    answer: string;
}) {
    try {
        const sql = db();
        await sql`
        insert into chat_logs (ip, locale, question, answer)
        values (${row.ip}, ${row.locale}, ${row.question}, ${row.answer})
        `;
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
    select id, created_at, ip, locale, question, answer
    from chat_logs
    where created_at > now() - interval '2 days'
    order by created_at desc
    limit 500
    `;
}
