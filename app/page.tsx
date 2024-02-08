import Input from "@/components/input";
import TasksList from "@/components/tasksList";

export default function Home() {
  return (
    <main className="w-[95%] sm:w-[80%] lg:w-[60%]  h-[80%] bg-gray-50 rounded-md shadow-2xl shadow-black-500/50 px-10">
      <div className="flex mt-5 items-center justify-between">
        <h1 className="font-bold text-2xl leading-none">Task Manager</h1>
        <p className="font-normal f text-sm ">12 Tasks</p>
      </div>
      <Input />
      <TasksList />
    </main>
  );
}
