/**
 * Telefon: rakam + uluslararası için +, (), boşluk, tire.
 * Diğer harf/sembol temizlenir.
 */
export function sanitizePhoneInput(value: string): string {
  return value.replace(/[^\d+()\s-]/g, "");
}

/** Zod / sunucu: boş veya geçerli telefon karakterleri */
export const phonePattern = /^[\d+()\s-]*$/;
