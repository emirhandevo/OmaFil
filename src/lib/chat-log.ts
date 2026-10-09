import {neon} from "@neondatabase/serverless";

function db() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL yok");
    return neon(url);
}

/** sohbet cevabı hazır olunca bir satır ekler. kayıt düşerse sohbet yine cevap verir */
export async function saveChatLog(row:{
    ip: string;
    locale: string;
    question: string;
    answer: string;
}) {
    try {
        await db()`
        insert into chat_logs (ip, locale, question, answer)
        values (${row.ip}, ${row.locale}, ${row.question}, ${row.answer})
        `;
    } catch (error) {
     console.error("chat-logs", error);
     }
}

/* panel listesi. en yeni kayıt üstte */
export async function listChatLogs() {
    return db()`
    select id, created_at, ip, locale, question, answer
    from chat_logs
    order by created_at desc
    limit 200
    `;
}
