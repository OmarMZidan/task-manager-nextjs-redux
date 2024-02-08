"use client";
import { useAppDispatch } from "@/state/store";
import { addTask } from "@/state/task/taskSlice";
import React from "react";

export default function Input() {
  const [taskInput, setTaskInput] = React.useState("");
  const dispatch = useAppDispatch();

  // handle task input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;
    dispatch(addTask(taskInput));
    setTaskInput("");
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit}>
        <input
          name="text"
          type="text"
          required
          value={taskInput}
          onChange={handleChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
