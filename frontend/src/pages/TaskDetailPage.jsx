import { useNavigate, useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTask } from '../contexts/TaskContext';
import { taskService } from '../services/apiService';
import { getErrorMessage, formatDate } from '../utils/helpers';
import { useFormValidation } from '../hooks/useFormValidation';
import Card from '../components/Card';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Alert from '../components/Alert';
import Loading from '../components/Loading';

export default function TaskDetailPage() {
  const navigate = useNavigate();
  const { id: taskId } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);



  const { tasks, updateTask, deleteTask } = useTask();

  const task = tasks.find((t) => t._id === taskId);

  const form = useFormValidation({
    title: task?.title || '',
    description: task?.description || '',
  });

  useEffect(() => {
    if (task) {
      form.setValues({
        title: task.title,
        description: task.description,
      });
      setIsLoading(false);
    }
  }, [task]);

  const handleToggleComplete = async () => {
    try {
      setIsSaving(true);
      setError('');
      const updated = await taskService.updateTask(taskId, {
        completed: !task.completed,
      });
      updateTask(taskId, updated.task);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.validateForm()) {
      return;
    }

    try {
      setIsSaving(true);
      const updated = await taskService.updateTask(taskId, {
        title: form.values.title,
        description: form.values.description,
      });
      updateTask(taskId, updated.task);
      setIsEditing(false);
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      setIsDeleting(true);
      setError('');
      await taskService.deleteTask(taskId);
      deleteTask(taskId);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
      setIsDeleting(false);
    }
  };

  if (isLoading || !task) {
    return <Loading />;
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">{task.title}</h1>
            <p className="text-gray-600">Created on {formatDate(task.createdAt)}</p>
          </div>
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              task.completed
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {task.completed ? 'Completed' : 'Pending'}
          </span>
        </div>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        {isEditing ? (
          <form onSubmit={handleUpdate} className="space-y-6">
            <Input
              type="text"
              name="title"
              label="Task Title"
              value={form.values.title}
              onChange={form.handleChange}
              onBlur={form.handleBlur}
              error={form.touched.title && form.errors.title}
              required
            />

            <TextArea
              name="description"
              label="Description"
              value={form.values.description}
              onChange={form.handleChange}
              rows={5}
            />

            <div className="flex gap-4">
              <Button type="submit" variant="primary" size="lg" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="lg"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{task.description || 'No description provided'}</p>
            </div>

            <div className="flex gap-4 flex-wrap">
              <Button
                onClick={handleToggleComplete}
                variant={task.completed ? 'secondary' : 'success'}
                size="lg"
                disabled={isSaving}
              >
                {task.completed ? 'Mark as Pending' : 'Mark as Complete'}
              </Button>
              <Button
                onClick={() => setIsEditing(true)}
                variant="primary"
                size="lg"
              >
                Edit
              </Button>
              <Button
                onClick={handleDelete}
                variant="danger"
                size="lg"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </Button>
              <Link to="/dashboard">
                <Button type="button" variant="secondary" size="lg">
                  Back to Dashboard
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

