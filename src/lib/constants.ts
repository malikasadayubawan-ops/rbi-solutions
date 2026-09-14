export const CONTACT_EMAIL = "inquiry@rbis.global";
export const SITE_URL = "https://www.rbis.global";

// International, digits-only WhatsApp number (no "+", spaces, or dashes) —
// required format for wa.me deep links. Displayed with formatting elsewhere;
// kept raw here since this constant only ever feeds the link itself.
export const WHATSAPP_NUMBER = "5511999184321";
export const WHATSAPP_MESSAGE =
  "Hello RBI Solutions, I would like more information about your residency and citizenship programs.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
