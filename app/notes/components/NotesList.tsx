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
      <div className="text-center text-gray-500 mt-8">
        No notes available.
      </div>
    );
  }

  return (
    <div className="grid gap-5 md:grid-cols-2">
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