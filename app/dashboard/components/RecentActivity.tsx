import { Activity } from "../types";

interface RecentActivityProps {
  activities: Activity[];
}

export default function RecentActivity({
  activities,
}: RecentActivityProps) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-5">
        Recent Activity
      </h2>

      {activities.length === 0 ? (
        <p className="text-gray-400">
          No activity yet.
        </p>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="border-b border-gray-700 pb-3"
            >
              {activity.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}