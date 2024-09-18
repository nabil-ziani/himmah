import { SupabaseClient } from "@supabase/supabase-js";
import { FileObject } from '@supabase/storage-js'
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

export async function getCategories(supabase: SupabaseClient, folder: string) {
  const { data, error } = await supabase.storage
    .from('focus_backgrounds')
    .list(folder)

  if (error) {
    console.error('Error retrieving files:', error)
    return []
  }

  return data
}

export async function getBackgrounds(supabase: SupabaseClient, folder: string) {
  const { data, error } = await supabase.storage
    .from('focus_backgrounds')
    .list(folder, { limit: 20 })

  if (error) {
    console.error('Error retrieving files:', error)
    return []
  }

  const files = data.map(file => {
    return {
      name: file.name,
      url: supabase.storage
        .from('focus_backgrounds')
        .getPublicUrl(`${folder}/${file.name}`).data.publicUrl
    }
  })

  return files
}