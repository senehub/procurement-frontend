import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function shortenUUID(uuid: string, length = 11) {
  return uuid.replace(/-/gi, "").slice(0, length);
}

export function cleanUnitName(name: string) {
  return name.replace(/unit/gi, "").trim();
}

export function cleanDepartmentName(name: string) {
  return name
    .replace(/(department)/gi, "")
    .replace(/(dept\.)/gi, "")
    .trim();
}

export function moneyFormatter(amount: number, currency: string = "GMD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  }).format(amount);
}

export function moneyShotFormatter(amount: number) {
  return new Intl.NumberFormat().format(amount);
}

export function combineFullName(name?: Record<string, unknown>) {
  if (!name) return name;
  if (name.middleName)
    return `${name.firstName} ${name.middleName} ${name.lastName}`;
  return `${name.firstName} ${name.lastName}`;
}

export function generateEntityCode(entityName: string) {
  const readableChars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Excludes ambiguous chars like O, I, 1, 0

  // generate random chars
  const randomPart = Array.from({ length: 5 }, () =>
    readableChars.charAt(Math.floor(Math.random() * readableChars.length))
  ).join("");

  const datePart = new Date().toISOString().slice(0, 10).replace(/-/g, ""); // "20241206"

  const entityPart = entityName.substring(0, 3).toUpperCase(); // Take the first 3 letters of the entity name

  return `${entityPart}-${datePart}-${randomPart}`;
}
