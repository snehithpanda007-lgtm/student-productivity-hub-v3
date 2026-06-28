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
    <div className="bg-gray-900 shadow-md rounded-lg p-6 mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        {editing ? "Edit Note" : "Create Note"}
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="bg-gray-800 w-full rounded-md p-3 mb-4 hover:bg-gray-700"
      />

      <textarea
        placeholder="Write your note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={6}
        className="bg-gray-800 w-full rounded-md p-3 mb-4 hover:bg-gray-700"
      />

      <button
        onClick={onSubmit}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
      >
        {editing ? "Update Note" : "Add Note"}
      </button>
    </div>
  );
}