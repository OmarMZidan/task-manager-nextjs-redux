import { IoAdd } from "react-icons/io5";
import { MdClose } from "react-icons/md";

export default function Modal({
  isModalOpen,
  onClose,
  type,
  onChange,
  onSubmit,
  taskInput,
}: ModalProps) {
  return (
    // backdrop
    <div
      onClick={onClose}
      className={`
        fixed inset-0 flex justify-center items-center transition-colors
        ${isModalOpen ? "visible bg-black/20" : "invisible"}
      `}
    >
      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-gray-100 w-2/4 max-w-2xl rounded-xl shadow p-6 transition-all 
          ${isModalOpen ? "scale-100 opacity-100 " : "scale-125 opacity-0"}
        `}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-600"
        >
          <MdClose />
        </button>
        <div>
          <h2 className="text-xl font-semibold mb-2">
            {type === "add" ? "Add a new task" : "Edit your task"}
          </h2>
          <form
            className="w-full flex justify-between drop-shadow-sm"
            onSubmit={onSubmit}
          >
            <input
              name="text"
              type="text"
              required
              value={taskInput}
              className="flex-grow p-2 border-[1px]  focus:outline-none"
              placeholder={type === "add" ? "Add a new task" : "Edit your task"}
              onChange={onChange}
              autoFocus={isModalOpen}
              autoComplete="off"
            />
            <button
              type="submit"
              className="bg-secondary w-[7%] flex justify-center items-center focus:scale-110 hover:scale-110 active:scale-100 transition cursor-pointer"
              aria-label={type === "add" ? "add-task" : "edit-task"}
            >
              <IoAdd className="text-white text-3xl" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
