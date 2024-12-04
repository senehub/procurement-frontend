import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenUUID(uuid: string, length = 11) {
  return uuid.replace(/-/gi, "").slice(0, length);
}
