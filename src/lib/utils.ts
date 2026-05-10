import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Use with `scrollIntoView` / `scrollTo` so reduced-motion users get instant jumps. */
export function scrollIntoViewBehavior(): ScrollBehavior {
  return globalThis.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    ? "auto"
    : "smooth";
}
