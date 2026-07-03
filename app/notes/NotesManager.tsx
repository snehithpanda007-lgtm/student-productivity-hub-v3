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
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Notes Management
      </h1>

      <NoteForm
        title={title}
        content={content}
        setTitle={setTitle}
        setContent={setContent}
        onSubmit={editingId ? updateNote : addNote}
        editing={editingId !== null}
      />

      {notes.length === 0 ? (
        <p className="text-gray-500 mt-6">
          No notes created yet.
        </p>
      ) : (
        <NotesList
          notes={notes}
          onEdit={editNote}
          onDelete={deleteNote}
        />
      )}
    </div>
  );
}