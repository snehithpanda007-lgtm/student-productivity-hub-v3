"use client";

import { Note } from "../types";
import NoteCard from "./NoteCard";

type Props = {
  notes: Note[];
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export default function NotesList({
  notes,
  onEdit,
  onDelete,
}: Props) {
  if (notes.length === 0) {
    return (
      <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
        <p className="text-gray-400">
          No notes available.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}