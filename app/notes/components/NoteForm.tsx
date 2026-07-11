"use client";

type NoteFormProps = {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  onSubmit: () => void;
  editing: boolean;
};

export default function NoteForm({
  title,
  content,
  setTitle,
  setContent,
  onSubmit,
  editing,
}: NoteFormProps) {
  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800 p-6">
      <h2 className="text-2xl font-semibold">
        {editing ? "Edit Note" : "Create Note"}
      </h2>

      <div className="mt-6">
        <label className="text-sm text-gray-400">
          Title
        </label>

        <input
          type="text"
          placeholder="Enter note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mt-5">
        <label className="text-sm text-gray-400">
          Content
        </label>

        <textarea
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="mt-2 w-full rounded-lg bg-gray-700 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <button
        onClick={onSubmit}
        className="mt-5 rounded-lg bg-blue-600 px-5 py-3 font-semibold hover:bg-blue-700 cursor-pointer"
      >
        {editing ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}