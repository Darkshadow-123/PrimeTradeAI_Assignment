import { useTask } from '../contexts/TaskContext';
import Input from './Input';

export default function TaskSearch() {
  const { searchQuery, setSearchQuery } = useTask();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Input
      type="text"
      placeholder="Search tasks..."
      value={searchQuery}
      onChange={handleSearch}
      className="mb-4"
    />
  );
}
