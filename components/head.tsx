"use client";
import { useAppDispatch } from "@/state/store";
import { addTask } from "@/state/task/taskSlice";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import Modal from "./modal";

export default function Head() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [taskInput, setTaskInput] = useState("");
  const dispatch = useAppDispatch();

  // handle task input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTaskInput(e.target.value);
  };

  // handle form submit
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;
    try {
      dispatch(addTask(taskInput));
      setTaskInput("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <div className="bg-primary sm:rounded-t-md h-28 sm:h-24 border-b-2 border-primary shadow-2xl px-3 sm:px-10 relative">
      <h1 className="font-bold text-2xl text-gray-50 leading-none text-center py-8 sm:py-5 uppercase">
        Task Manager
      </h1>
      <button
        className="absolute bg-secondary right-10 w-14 h-14 -bottom-7 sm:w-16 sm:h-16 sm:-bottom-8 rounded-full flex justify-center items-center focus:scale-110 hover:scale-110 active:scale-100 transition cursor-pointer drop-shadow-xl"
        aria-label="open-modal"
        onClick={() => {
          setIsModalOpen(true);
        }}
      >
        <IoAdd className="text-white text-3xl" />
      </button>
      <Modal
        isModalOpen={isModalOpen}
        type="add"
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        taskInput={taskInput}
        onChange={handleChange}
      ></Modal>
    </div>
  );
}
