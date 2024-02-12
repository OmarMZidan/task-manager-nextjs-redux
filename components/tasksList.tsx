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
      <ul className="mt-12">
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
            onClickText={() => handleToggleCompleted(task.id)}
          />
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
