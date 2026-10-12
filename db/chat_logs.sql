-- Sohbet kayıtlarının kurulumu.
-- Canlı veritabanı doluyken çalıştırma. Neon sıfırlanırsa SQL Editor'e yapıştır, bir kez Run.
-- Tablo siteyi besler. chat_sheet yalnız okuma ekranıdır.

create table if not exists chat_logs (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  ip text not null,
  locale text not null,
  question text not null,
  answer text not null,
  session_id text
);

-- Aynı sohbet kodu tek satır. Boş kodlar birbirine karışmasın.
create unique index if not exists chat_logs_session_uidx
  on chat_logs (session_id)
  where session_id is not null and session_id <> '';

-- Bir satırdaki soru ve cevabı numaralı turlara böler.
create or replace function chat_turns(q text, a text)
returns table(ord integer, question text, answer text)
language plpgsql
as $function$
declare
  qs text[];
  ans text[];
  i int;
  n int;
  piece text;
  mark constant text := E'\nCevap: ';
  at int;
  from_label text;
begin
  -- Yeni kayıtlar beş yıldızla ayrılır. Eski kayıtlar soru satırı ve "Soru:" bloğuyla ayrılır.
  if position(E'\n*****\n' in coalesce(q, '')) > 0 or position(E'\n*****\n' in coalesce(a, '')) > 0 then
    qs := string_to_array(coalesce(q, ''), E'\n*****\n');
    ans := string_to_array(coalesce(a, ''), E'\n*****\n');
  elsif position(E'\n\nSoru:' in coalesce(a, '')) > 0 then
    ans := regexp_split_to_array(coalesce(a, ''), E'\n\n(?=Soru:)');
    qs := string_to_array(coalesce(q, ''), E'\n');
  else
    qs := array[coalesce(q, '')];
    ans := array[coalesce(a, '')];
  end if;

  n := greatest(coalesce(array_length(qs, 1), 0), coalesce(array_length(ans, 1), 0));
  for i in 1..n loop
    piece := coalesce(ans[i], '');
    from_label := null;
    if piece like 'Soru:%' and position(mark in piece) > 0 then
      at := position(mark in piece);
      from_label := btrim(substr(piece, char_length('Soru: ') + 1, at - char_length('Soru: ') - 1));
      piece := btrim(substr(piece, at + char_length(mark)));
    end if;
    ord := i;
    question := nullif(btrim(coalesce(qs[i], '')), '');
    if question is null then
      question := coalesce(from_label, '');
    end if;
    answer := piece;
    return next;
  end loop;
end;
$function$;

-- Neon tablosu. Aynı sohbet aynı no, soru ve cevap yan yana, arada yıldız satırı.
create or replace view chat_sheet as
with pairs as (
  select
    c.id as chat_id,
    nullif(c.session_id, '') as session_id,
    c.ip,
    t.ord,
    t.question,
    t.answer
  from chat_logs c
  cross join lateral chat_turns(c.question, c.answer) t(ord, question, answer)
),
lines as (
  select
    p.chat_id,
    p.ord,
    0 as part,
    p.session_id,
    case when p.ord = 1 then p.chat_id else null::bigint end as id,
    case when p.ord = 1 then p.ip else null::text end as ip,
    (p.ord::text || '. ') || p.question as question,
    (p.ord::text || '. ') || p.answer as answer
  from pairs p
  union all
  select
    p.chat_id,
    p.ord,
    1,
    p.session_id,
    null::bigint,
    null::text,
    '****',
    '*****'
  from pairs p
)
select
  dense_rank() over (order by chat_id desc)::integer as no,
  row_number() over (order by chat_id desc, ord, part) as n,
  session_id,
  id,
  ip,
  question,
  answer
from lines;
