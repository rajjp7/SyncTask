const UserDashboard = ({ tasks }) => {
  const currentUserEmail = 'user@example.com'; // Replace with actual login info
  const userTasks = tasks.filter(task => task.assignedTo === currentUserEmail);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Welcome User</h2>
      <h3 className="text-xl font-semibold mb-2">Your Tasks</h3>
      {userTasks.length === 0 ? (
        <p>No tasks assigned yet.</p>
      ) : (
        <ul className="space-y-4">
          {userTasks.map(task => (
            <li key={task.id} className="bg-white p-4 rounded shadow">
              <h4 className="text-lg font-bold">{task.title}</h4>
              <p className="text-gray-700">{task.description}</p>
              <p className="text-sm text-gray-500">Status: {task.status}</p>
              <p className="text-sm text-gray-400">Assigned on: {task.createdAt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
