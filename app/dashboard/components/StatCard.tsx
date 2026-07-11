type StatCardProps = {
  title: string;
  value: string | number;
  color: string;
};

export default function StatCard({
  title,
  value,
  color,
}: StatCardProps) {
  return (
    <div>
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h2>
    </div>
  );
}