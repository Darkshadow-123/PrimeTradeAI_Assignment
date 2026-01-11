import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTask } from '../contexts/TaskContext';
import { taskService } from '../services/apiService';
import { getErrorMessage, formatDate } from '../utils/helpers';
import Input from '../components/Input';
import Card from '../components/Card';
import Alert from '../components/Alert';
import Loading from '../components/Loading';
import EmptyState from '../components/EmptyState';
import Button from '../components/Button';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { tasks, setTasks } = useTask();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all | pending | completed

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        setError('');
        const data = await taskService.getTasks();
        setTasks(data.tasks || []);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    };

    fetchTasks();
  }, [setTasks]);

  if (isLoading) {
    return <Loading />;
  }

    const filteredTasks = tasks.filter((t) => {
  const matchesStatus =
    statusFilter === 'all' ||
    (statusFilter === 'completed' && t.completed) ||
    (statusFilter === 'pending' && !t.completed);

  const matchesSearch =
    !searchTitle ||
    t.title.toLowerCase().includes(searchTitle.toLowerCase());

  return matchesStatus && matchesSearch;
});

  const handleSearch = () => {
  if (!searchTitle) return;

  const foundTask = filteredTasks[0];
  if (foundTask) {
    navigate(`/tasks/${foundTask._id}`);
  } else {
    setError('No task found with that title');
  }
};

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
        <p className="text-blue-100">Manage your tasks and stay productive</p>
      </Card>

      {/* User Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        <Card>
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600">{tasks.length}</p>
        </Card>
        <Card>
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-green-600">
            {tasks.filter((t) => t.completed).length}
          </p>
        </Card>
        <Card>
          <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending</h3>
          <p className="text-3xl font-bold text-orange-600">
            {tasks.filter((t) => !t.completed).length}
          </p>
        </Card>
      </div>

      {/* Tasks Section */}
      <Card>
        <div className="mb-6 space-y-4">
  {/* Search */}
  <div className="flex gap-2">
    <Input
      type="text"
      name="search"
      placeholder="Search task by title"
      value={searchTitle}
      onChange={(e) => setSearchTitle(e.target.value)}
    />
    <Button type="button" variant="primary" onClick={handleSearch}>
      Search
    </Button>
  </div>

  {/* Filter */}
  <div className="flex gap-2 flex-wrap">
    <Button
      type="button"
      variant={statusFilter === 'all' ? 'primary' : 'secondary'}
      onClick={() => setStatusFilter('all')}
    >
      All
    </Button>

    <Button
      type="button"
      variant={statusFilter === 'pending' ? 'primary' : 'secondary'}
      onClick={() => setStatusFilter('pending')}
    >
      Pending
    </Button>

    <Button
      type="button"
      variant={statusFilter === 'completed' ? 'primary' : 'secondary'}
      onClick={() => setStatusFilter('completed')}
    >
      Completed
    </Button>
  </div>
</div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
          <Link to="/dashboard/tasks/new">
            <Button variant="primary">+ New Task</Button>
          </Link>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {filteredTasks.length === 0 ? (
          <EmptyState message="No tasks yet. Create one to get started!" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Title</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Created</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{task.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          task.completed
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {task.completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-gray-600">{formatDate(task.createdAt)}</td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Link to={`/dashboard/tasks/${task._id}`}>
                          <Button variant="secondary" size="sm">
                            View
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}

