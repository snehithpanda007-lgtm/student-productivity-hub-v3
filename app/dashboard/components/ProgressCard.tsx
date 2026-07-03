interface ProgressCardProps {
  completedTasks: number;
  totalTasks: number;
  productivity: number;
}

export default function ProgressCard({
  completedTasks,
  totalTasks,
  productivity,
}: ProgressCardProps) {
  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow">
      <h2 className="text-xl font-semibold mb-4">
        Productivity Progress
      </h2>

      <div className="w-full bg-gray-700 rounded-full h-4">
        <div
          className="bg-green-500 h-4 rounded-full transition-all"
          style={{
            width: `${productivity}%`,
          }}
        />
      </div>

      <p className="mt-3 text-gray-400">
        {completedTasks} of {totalTasks} tasks completed
      </p>
    </div>
  );
}