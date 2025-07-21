'use server';

import { getSupabaseClient } from '@/utils/supabase/server';

export async function addNote(title: string, content: string) {
  try {
    const supabase = await getSupabaseClient();
    const response = await supabase.from('notes').insert({
      title,
      content
    });

    console.log('Note successfully added!', response);
  } catch (error: any) {
    console.error('Error adding note:', error.message);
    throw new Error('Failed to add Note');
  }
}

