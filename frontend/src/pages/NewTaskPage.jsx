import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { useTask } from '../contexts/TaskContext';
import { taskService } from '../services/apiService';
import { getErrorMessage } from '../utils/helpers';
import { useFormValidation } from '../hooks/useFormValidation';
import Card from '../components/Card';
import Input from '../components/Input';
import TextArea from '../components/TextArea';
import Button from '../components/Button';
import Alert from '../components/Alert';

export default function NewTaskPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { addTask } = useTask();

  const form = useFormValidation({
    title: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      const newTask = await taskService.createTask({
        title: form.values.title,
        description: form.values.description,
      });
      addTask(newTask.task);
      navigate('/dashboard');
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <Card>
        <h1 className="text-3xl font-bold mb-6">Create New Task</h1>

        {error && <Alert type="error" message={error} onClose={() => setError('')} />}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            type="text"
            name="title"
            label="Task Title"
            placeholder="Enter task title"
            value={form.values.title}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            error={form.touched.title && form.errors.title}
            required
          />

          <TextArea
            name="description"
            label="Description"
            placeholder="Enter task description"
            value={form.values.description}
            onChange={form.handleChange}
            onBlur={form.handleBlur}
            rows={5}
          />

          <div className="flex gap-4">
            <Button type="submit" variant="primary" size="lg" disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Task'}
            </Button>
            <Link to="/dashboard">
              <Button type="button" variant="secondary" size="lg">
                Cancel
              </Button>
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}

