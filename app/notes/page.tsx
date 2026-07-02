"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Note } from "./types";

import NoteForm from "./components/NoteForm";
import NotesList from "./components/NotesList";

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const supabase = useMemo(() => createClient(), []);

  useEffect(() => {
  fetchNotes();
  }, []);

  const fetchNotes = async () => {

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setNotes(data ?? []);
  };

  const clearForm = () => {
    setTitle("");
    setContent("");
    setEditingId(null);
  };

  const addNote = async () => {
    if (!title.trim() || !content.trim()) return;

    const { error } = await supabase.from("notes").insert({
      title,
      content,
    });

    if (error) {
      console.error(error);
      return;
    }

    clearForm();
    fetchNotes();
  };

  const deleteNote = async (id: string) => {
    const { error } = await supabase
      .from("notes")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      return;
    }

    fetchNotes();
  };

  const editNote = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  };

  const updateNote = async () => {
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
  };

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