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
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h3 className="text-2xl font-semibold">
        {note.title}
      </h3>

      <p className="mt-4 whitespace-pre-wrap text-gray-300 leading-7">
        {note.content}
      </p>

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => onEdit(note)}
          className="rounded-lg bg-yellow-500 px-5 py-3 font-semibold text-white hover:bg-yellow-600 cursor-pointer"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(note.id)}
          className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700 cursor-pointer"
        >
          Delete
        </button>
      </div>
    </div>
  );
}