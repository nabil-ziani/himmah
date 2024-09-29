import { Tables } from "@/database.types";
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

// --------- TASKS ---------
export const fetchProfileData = async (supabase: SupabaseClient, id: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select('id, name, email')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching profile data:', error);
  }

  return data
}

// --------- FOCUS ---------
export const fetchAllBackgrounds = async (supabase: SupabaseClient) => {
  const { data, error } = await supabase
    .from('backgrounds')
    .select('*')

  if (error) {
    console.error('Error fetching backgrounds:', error)
    return []
  }

  return data
}

export const fetchAffirmations = async (supabase: SupabaseClient, category: string) => {
  const { data: affirmations, error } = await supabase
    .from('affirmations')
    .select('*')
    .eq('category', category);

  if (error) {
    console.error('Error fetching backgrounds:', error)
    return []
  }

  return affirmations
}

// Helper functie om de tijd te converteren naar een leesbaar formaat
export function formatFocusTime(totalMinutes: number): string {
  if (totalMinutes >= 1440) {
    return `${Math.floor(totalMinutes / 1440)} day${Math.floor(totalMinutes / 1440) > 1 ? 's' : ''}`;
  } else if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours} hour${hours > 1 ? 's' : ''}${minutes > 0 ? `, ${minutes} minute${minutes > 1 ? 's' : ''}` : ''}`;
  } else {
    return `${totalMinutes} minute${totalMinutes > 1 ? 's' : ''}`;
  }
}

export function durationToSeconds(duration: string): number {
  const parts = duration.split(':'); // Split de string op basis van ':'
  if (parts.length === 3) {
    const hours = parseInt(parts[0], 10) || 0; // Uren
    const minutes = parseInt(parts[1], 10) || 0; // Minuten
    const seconds = parseFloat(parts[2]) || 0; // Seconden (inclusief milliseconden)
    return hours * 3600 + minutes * 60 + seconds; // Totale seconden
  }
  return 0; // Retourneer 0 als de duur niet correct is
}