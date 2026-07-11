"use client";

import { useMemo, useState } from "react";

import { createClient } from "@/lib/supabase/client";

import { Note } from "./types";

import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

interface NotesManagerProps {
  initialNotes: Note[];
}

export default function NotesManager({
  initialNotes,
}: NotesManagerProps) {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  async function fetchNotes() {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data ?? []);
  }

  async function addNote() {
    if (!title.trim() || !content.trim()) return;

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("notes").insert({
      title,
      content,
      user_id: user.id,
    });

    if (error) {
      console.error(error);
      return;
    }

    clearForm();
    fetchNotes();
  }

  async function updateNote() {
    if (!editingId) return;

    if (!title.trim() || !content.trim()) return;

    const { error } = await supabase
      .from("notes")
      .update({
        title,
        content,
      })
      .eq("id", editingId);

    if (error) {
      console.error(error);
      return;
    }

    clearForm();
    fetchNotes();
  }

  async function deleteNote(id: string) {
    if (!confirm("Delete this note?")) return;

    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    setNotes((prev) => prev.filter((note) => note.id !== id));
  }

  function editNote(note: Note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  }

  return (
    <main className="min-h-screen text-white px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-bold">
          Notes Management
        </h1>

        <p className="mt-2 text-gray-400">
          Create, edit and organize your personal notes.
        </p>

        <div className="mt-8">
          <NoteForm
            title={title}
            content={content}
            setTitle={setTitle}
            setContent={setContent}
            onSubmit={editingId ? updateNote : addNote}
            editing={editingId !== null}
          />
        </div>

        {notes.length === 0 ? (
          <div className="mt-6 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <p className="text-gray-400">
              No notes created yet.
            </p>
          </div>
        ) : (
          <div className="mt-6">
            <NotesList
              notes={notes}
              onEdit={editNote}
              onDelete={deleteNote}
            />
          </div>
        )}
      </div>
    </main>
  );
}