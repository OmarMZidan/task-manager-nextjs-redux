import { useAppDispatch } from "@/state/store";
import { TasksFilters, tasksFilter } from "@/state/task/taskSlice";

export default function Filter() {
  const dispatch = useAppDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(tasksFilter(e.target.value));
  };
  return (
    <div className="mt-5 ml-5">
      <label htmlFor="tasks-filter" className="text-xs">
        Filter by:
      </label>
      <select
        id="tasks-filter"
        name="tasksFilter"
        onChange={handleFilterChange}
        className="mt-1 pl-3 pr-2 py-2 font-bold text-gray-600 border-gray-300 text-xs sm:text-sm rounded-0 shadow-sm bg-transparent border-0 border-b-2 focus:outline-none focus:ring-0"
      >
        <option value={TasksFilters.ALL}>All Tasks</option>
        <option value={TasksFilters.COMPLETED}>Completed Tasks</option>
        <option value={TasksFilters.UNCOMPLETED}>Uncompleted Tasks</option>
      </select>
    </div>
  );
}
