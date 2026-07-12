"use client";

import { useMemo, useState } from "react";
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
  const [search, setSearch] = useState("");

  const filteredNotes = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return notes;

    return notes.filter((note) => {
      const title = note.title?.toLowerCase() ?? "";
      const content = note.content?.toLowerCase() ?? "";

      return (
        title.includes(query) ||
        content.includes(query)
      );
    });
  }, [notes, search]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <input
          type="text"
          placeholder="Search notes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-400 outline-none transition-colors focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
      </div>

      {/* Empty State */}
      {filteredNotes.length === 0 ? (
        <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
          <p className="text-gray-400">
            {search
              ? "No matching notes found."
              : "No notes available."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}