import CreateTaskButton from "@/app/components/CreateTaskButton";
import TaskList from "@/app/components/TaskList";
import Link from "next/link";

async function getCategoryTasks() {
    return {
        category_name: 'Category 1',
        tasks_count: 20,
        icon: '/icons/all.png',
        tasks: [
            {
                id: 1,
                title: 'Comer',
                time: '16:00',
                status: 'IN_PROGRESS'
            },
            {
                id: 1,
                title: 'Comer',
                time: '16:00',
                status: 'IN_PROGRESS'
            },
            {
                id: 1,
                title: 'Comer',
                time: '16:00',
                status: 'IN_PROGRESS'
            },
            {
                id: 1,
                title: 'Comer',
                time: '16:00',
                status: 'DONE'
            },
        ]
    }
}


export default async function CategoryPage({ params }: any) {
    const data = await getCategoryTasks()
    return <div className="flex-row h-screen bg-main-1">
        <header className="flex justify-between p-5">
            <Link href='/'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                </svg>
            </Link>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
        </header>
        <div className="bg-white rounded-full p-3 my-4 mx-7 w-12"><img src={data.icon} alt="..." /></div>
        <h1 className="capitalize font-bold text-xl px-7 text-slate-100">{data.category_name}</h1>
        <p className="px-7 text-sm text-slate-200">{data.tasks_count} Tasks</p>
        {/* add task list */}
        <TaskList tasks={data.tasks} />

        <CreateTaskButton />
    </div>
}