import { getCategoryTasks } from "@/app/api/repositories/taskRepository";
import CategoryPageHeader from "@/app/components/CategoryPageHeader";
import CreateTaskButton from "@/app/components/CreateTaskButton";
import TaskList from "@/app/components/TaskList";
import Image from "next/image";

export default async function CategoryPage({ params }: any) {
    const data = await getCategoryTasks(parseInt(params.categoryId))
    return <div className="flex-row h-screen bg-main-1">
        <CategoryPageHeader tasks_count={data?.tasks_count || 0} />
        <div className="bg-white rounded-full p-3 my-4 mx-7 w-12"><Image width={200} height={200} src={data?.icon || ''} alt="..." /></div>
        <h1 className="capitalize font-bold text-xl px-7 text-slate-100">{data?.title}</h1>
        <p className="px-7 text-sm text-slate-200">{data?.tasks_count} Tasks</p>

        {data && data.tasks && <TaskList tasks={data.tasks} />}

        <CreateTaskButton />
    </div>
}