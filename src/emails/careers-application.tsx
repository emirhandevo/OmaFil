import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { CareersPayload } from "@/lib/schemas/careers";

type Props = CareersPayload & { fileName: string };

/** İK’ya giden iş başvurusu bildirimi (CV ekli) */
export function CareersApplicationEmail({
  name,
  email,
  phone,
  position,
  message,
  fileName,
}: Props) {
  return (
    <Html lang="tr">
      <Head />
      <Preview>
        İş başvurusu: {name}
        {position ? ` — ${position}` : ""}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Yeni iş başvurusu</Heading>
          <Text style={muted}>
            OmaFil web sitesi İnsan Kaynakları formundan CV ile başvuru geldi.
          </Text>
          <Text style={attachHint}>
            CV bu e-postanın ekinde (PDF). Mail istemcisinin üstündeki ek / kâğıt
            klips simgesine tıklayarak indirin — aşağıdaki dosya adı yalnızca
            bilgilendirme metnidir.
          </Text>
          <Hr style={hr} />
          <Section>
            <Text style={row}>
              <strong>Ad Soyad:</strong> {name}
            </Text>
            <Text style={row}>
              <strong>E-posta:</strong> {email}
            </Text>
            <Text style={row}>
              <strong>Telefon:</strong> {phone || "—"}
            </Text>
            <Text style={row}>
              <strong>Pozisyon:</strong> {position || "Belirtilmedi"}
            </Text>
            <Text style={row}>
              <strong>Ek dosya adı:</strong> {fileName}
            </Text>
          </Section>
          {message ? (
            <>
              <Hr style={hr} />
              <Text style={label}>Ön yazı / not</Text>
              <Text style={messageBox}>{message}</Text>
            </>
          ) : null}
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f4f4f5",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "40px auto",
  padding: "32px",
  borderRadius: "12px",
  maxWidth: "560px",
};

const heading = {
  fontSize: "22px",
  color: "#0f172a",
  margin: "0 0 8px",
};

const muted = {
  fontSize: "14px",
  color: "#71717a",
  margin: "0 0 12px",
};

const attachHint = {
  fontSize: "14px",
  color: "#0f172a",
  backgroundColor: "#fff7ed",
  border: "1px solid #fed7aa",
  borderRadius: "8px",
  padding: "12px 14px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const hr = {
  borderColor: "#e4e4e7",
  margin: "20px 0",
};

const row = {
  fontSize: "14px",
  color: "#18181b",
  margin: "0 0 8px",
  lineHeight: "22px",
};

const label = {
  fontSize: "12px",
  fontWeight: 600,
  color: "#71717a",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  margin: "0 0 8px",
};

const messageBox = {
  fontSize: "14px",
  color: "#18181b",
  lineHeight: "22px",
  whiteSpace: "pre-wrap" as const,
  margin: 0,
};
