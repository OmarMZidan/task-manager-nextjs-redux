"use client";
import { useAppDispatch, useAppSelector } from "@/state/store";
import React, { useMemo, useState } from "react";
import Modal from "./modal";
import {
  toggleCompletedTask,
  removeTask,
  editTask,
  TasksFilters,
} from "@/state/task/taskSlice";
import Filter from "./tasksFilter";
import TaskItem from "./taskItem";

export default function TasksList() {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const filter = useAppSelector((state) => state.tasks.filterBy);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);

  // the function to handle the filter logic
  // useMemo to cache the result of a calculation between re-renders.
  const filteredTasks = useMemo(() => {
    switch (filter) {
      case TasksFilters.COMPLETED:
        return tasks.filter((task) => task.completed);
      case TasksFilters.UNCOMPLETED:
        return tasks.filter((task) => !task.completed);
      case TasksFilters.ALL:
      default:
        return tasks;
    }
  }, [tasks, filter]);

  // const handleToggleCompleted = useCallback(
  //   (id: string) => {
  //     dispatch(toggleCompletedTask(id));
  //   },
  //   [dispatch]
  // );

  // const handleRemoveTask = useCallback(
  //   (id: string) => {
  //     dispatch(removeTask(id));
  //   },
  //   [dispatch]
  // );

  // const handleEditInputChange = useCallback(
  //   (e: React.ChangeEvent<HTMLInputElement>) => {
  //     taskToEdit && setTaskToEdit({ ...taskToEdit, text: e.target.value });
  //   },
  //   [taskToEdit]
  // );

  // const handleSubmitEdit = useCallback(
  //   (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     taskToEdit &&
  //       dispatch(editTask({ id: taskToEdit?.id, text: taskToEdit?.text }));
  //     setIsModalOpen(false);
  //   },
  //   [dispatch, taskToEdit]
  // );
  const handleToggleCompleted = (id: string) => {
    try {
      dispatch(toggleCompletedTask(id));
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };
  const handleRemoveTask = (id: string) => {
    try {
      dispatch(removeTask(id));
    } catch (error) {
      console.error("Failed to remove task:", error);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    taskToEdit && setTaskToEdit({ ...taskToEdit, text: e.target.value });
  };

  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskToEdit) {
      try {
        dispatch(editTask({ id: taskToEdit.id, text: taskToEdit.text }));
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to edit task:", error);
      }
    }
  };
  return (
    <>
      <Filter />
      <ul className=" mt-12">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onChange={() => handleToggleCompleted(task.id)}
            onClickEdit={() => {
              setTaskToEdit(task);
              setIsModalOpen(true);
            }}
            onClickRemove={() => handleRemoveTask(task.id)}
          />
          // <li
          //   key={task.id}
          //   className="flex w-full items-center border-b-2 py-4"
          // >
          //   <div className="px-3 sm:px-10 flex flex-grow justify-between">
          //     <div className="flex items-center gap-4">
          //       <input
          //         type="checkbox"
          //         className="w-4 h-4 accent-primary bg-gray-100 border-gray-600 rounded cursor-pointer"
          //         aria-label="toggle-todo"
          //         onChange={() => handleToggleCompleted(task.id)}
          //         checked={task.completed}
          //       />
          //       <p
          //         className={`text-gray-600 ${
          //           task.completed ? "line-through text-opacity-50" : ""
          //         }`}
          //       >
          //         {task.text}
          //       </p>
          //     </div>
          //     <div className="flex gap-2">
          //       <button
          //         aria-label="edit-todo"
          //         className=""
          //         onClick={() => {
          //           setTaskToEdit(task);
          //           setIsModalOpen(true);
          //         }}
          //       >
          //         <MdEdit className="h-5 w-5 text-primary hover:text-secondary focus:scale-125 hover:scale-125 active:scale-100 transition" />
          //       </button>
          //       <button
          //         aria-label="remove-todo"
          //         className=""
          //         onClick={() => handleRemoveTask(task.id)}
          //       >
          //         <MdDelete className="h-5 w-5 text-primary hover:text-secondary focus:scale-125 hover:scale-125 active:scale-100 transition" />
          //       </button>
          //     </div>
          //   </div>
          // </li>
        ))}
      </ul>
      <Modal
        isModalOpen={isModalOpen}
        type="edit"
        onClose={() => setIsModalOpen(false)}
        taskInput={taskToEdit ? taskToEdit.text : ""}
        onChange={handleEditInputChange}
        onSubmit={handleSubmitEdit}
      ></Modal>
    </>
  );
}
