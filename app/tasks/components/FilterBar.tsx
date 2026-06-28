interface Props {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function FilterBar({ filter, setFilter }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      {["all", "completed", "pending"].map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`px-3 py-1 rounded cursor-pointer ${
            filter === item
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-900 hover:bg-gray-800"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}