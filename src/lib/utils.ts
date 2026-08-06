import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatFigure(amount: string, currency: string) {
  if (!currency) return amount;
  return `${amount} ${currency}`;
}
