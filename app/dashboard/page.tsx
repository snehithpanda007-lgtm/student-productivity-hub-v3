export default function DashboardPage() {
  const stats = [
    { title: "Tasks Completed", value: 24 },
    { title: "Tasks Pending", value: 8 },
    { title: "Notes Created", value: 15 },
    { title: "Productivity Score", value: "87%" },
  ];

  const activities = [
    "Completed React Assignment",
    "Added Note: Next.js Routing",
    "Created New Task",
    "Updated Dashboard UI",
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard
        </h1>

        <p className="text-gray-500">
          Welcome back! Here's your productivity overview.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((item) => (
          <div
            key={item.title}
            className="bg-gray-900 rounded-xl shadow p-6"
          >
            <h3 className="text-gray-500 text-sm">
              {item.title}
            </h3>

            <p className="text-3xl font-bold mt-2">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-10 bg-gray-900 rounded-xl shadow p-6">
        <h2 className="text-xl font-semibold mb-4">
          Recent Activity
        </h2>

        <ul className="space-y-3">
          {activities.map((activity, index) => (
            <li
              key={index}
              className="border-b pb-2"
            >
              {activity}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}