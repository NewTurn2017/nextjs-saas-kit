import AddNoteForm from '../../../components/app/notes/AddNoteForm';
import { getSupabaseClient } from '@/utils/supabase/server';
import { Suspense } from 'react';

async function NotesList() {
  // Query the 'notes' table to render the list of tasks
  const supabase = await getSupabaseClient();
  const { data, error } = await supabase.from('notes').select();
  if (error) {
    throw error;
  }
  const notes = data;

  return (
    <div className="space-y-4">
      {notes?.map((note: any) => (
        <div key={note.id} className="bg-[var(--background)] rounded-lg p-4 shadow-lg">
          <h1 className="text-xl font-semibold">{note.title}</h1>
          <p className="text-gray-600 whitespace-pre-wrap">{note.content}</p>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Notes</h1>
      <Suspense fallback={<div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-[var(--background)] rounded-lg p-4 shadow-lg animate-pulse">
            <div className="h-6 bg-[var(--background)] rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-[var(--background)] rounded w-3/4"></div>
          </div>
        ))}
      </div>}>
        <NotesList />
      </Suspense>
      <AddNoteForm />
    </div>
  );
}
