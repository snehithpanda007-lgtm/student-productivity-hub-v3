"use client";

import { Note } from "../types";

type Props = {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
};

export default function NoteCard({
  note,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="rounded-lg shadow p-5 bg-gray-900">
      <h3 className="text-xl font-bold mb-2">{note.title}</h3>

      <p className="text-gray-700 whitespace-pre-wrap">
        {note.content}
      </p>

      <div className="flex gap-3 mt-5">
        <button
          onClick={() => onEdit(note)}
          className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete
        </button>
      </div>
    </div>
  );
}