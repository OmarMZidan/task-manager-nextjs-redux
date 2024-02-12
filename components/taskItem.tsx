import React from "react";
import { MdDelete, MdEdit } from "react-icons/md";

export default function TaskItem({
  task,
  onChange,
  onClickEdit,
  onClickRemove,
}: TaskItemProps) {
  const { completed, text } = task;
  return (
    <li className="flex w-full items-center border-b-2 py-4">
      <div className="px-3 sm:px-10 flex flex-grow justify-between">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-4 h-4 accent-primary bg-gray-100 border-gray-600 rounded cursor-pointer"
            aria-label="toggle-todo"
            onChange={onChange}
            checked={completed}
          />
          <p
            className={`text-gray-600 ${
              completed ? "line-through text-opacity-50" : ""
            }`}
          >
            {text}
          </p>
        </div>
        <div className="flex gap-2">
          <button aria-label="edit-todo" className="" onClick={onClickEdit}>
            <MdEdit className="h-5 w-5 text-primary hover:text-secondary focus:scale-125 hover:scale-125 active:scale-100 transition" />
          </button>
          <button aria-label="remove-todo" className="" onClick={onClickRemove}>
            <MdDelete className="h-5 w-5 text-primary hover:text-secondary focus:scale-125 hover:scale-125 active:scale-100 transition" />
          </button>
        </div>
      </div>
    </li>
  );
}
