import Head from "@/components/head";
import TasksList from "@/components/tasksList";

export default function Home() {
  return (
    <main className=" max-w-4xl mx-auto sm:mt-8 bg-gray-100 rounded-md shadow-2xl shadow-black-500/50 h-5/6  overflow-x-hidden overscroll-y-auto">
      <Head />
      <TasksList />
    </main>
  );
}
