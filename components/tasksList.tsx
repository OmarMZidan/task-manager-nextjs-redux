"use client";
import { useAppDispatch, useAppSelector } from "@/state/store";
import { addTask } from "@/state/task/taskSlice";
import React from "react";

export default function TasksList() {
  const tasks = useAppSelector((state) => state.tasks);
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>{task.text}</div>
      ))}
    </div>
  );
}
