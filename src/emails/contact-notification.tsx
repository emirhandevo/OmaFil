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
import type { ContactPayload } from "@/lib/schemas/contact";

type Props = ContactPayload;

/** Site sahibine giden bildirim maili */
export function ContactNotificationEmail({
  name,
  email,
  phone,
  company,
  productGroup,
  message,
}: Props) {
  return (
    <Html lang="tr">
      <Head />
      <Preview>
        Yeni iletişim formu: {name} — {productGroup}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Yeni iletişim formu</Heading>
          <Text style={muted}>OmaFil web sitesinden yeni bir mesaj geldi.</Text>
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
              <strong>Firma:</strong> {company || "—"}
            </Text>
            <Text style={row}>
              <strong>Talep türü:</strong> {productGroup}
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={label}>Mesaj</Text>
          <Text style={messageBox}>{message}</Text>
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
  margin: "0 0 16px",
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
