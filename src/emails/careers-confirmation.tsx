import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Text,
} from "@react-email/components";

type Props = { name: string };

/** Başvuru sahibine kısa onay */
export function CareersConfirmationEmail({ name }: Props) {
  const firstName = name.trim().split(/\s+/)[0] || "Merhaba";

  return (
    <Html lang="tr">
      <Head />
      <Preview>Başvurunuz alındı — OmaFil</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Başvurunuz alındı</Heading>
          <Text style={text}>Merhaba {firstName},</Text>
          <Text style={text}>
            İş başvurunuz ve CV’niz bize ulaştı. İnsan kaynakları ekibimiz
            değerlendirme sonrası gerekirse sizinle iletişime geçecektir.
          </Text>
          <Hr style={hr} />
          <Text style={footer}>
            OmaFil İplik Üretim Sanayi
            <br />
            Bu otomatik bir onay mesajıdır.
          </Text>
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
  margin: "0 0 16px",
};

const text = {
  fontSize: "15px",
  color: "#3f3f46",
  lineHeight: "24px",
  margin: "0 0 12px",
};

const hr = {
  borderColor: "#e4e4e7",
  margin: "24px 0 16px",
};

const footer = {
  fontSize: "12px",
  color: "#a1a1aa",
  lineHeight: "20px",
  margin: 0,
};
