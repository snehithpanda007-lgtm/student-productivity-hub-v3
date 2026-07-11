interface Props {
  filter: string;
  setFilter: (filter: string) => void;
}

export default function FilterBar({ filter, setFilter }: Props) {
  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {["all", "completed", "pending"].map((item) => (
        <button
          key={item}
          onClick={() => setFilter(item)}
          className={`rounded-lg px-5 py-2 font-medium capitalize transition-colors cursor-pointer ${
            filter === item
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}