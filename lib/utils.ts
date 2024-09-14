import { SupabaseClient } from "@supabase/supabase-js";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Helper functie om tijdzonecorrectie toe te passen
export function adjustForTimezone(date: Date): Date {
  const timeZoneOffset = date.getTimezoneOffset() * 60000; // Offset in milliseconden
  return new Date(date.getTime() - timeZoneOffset);
}