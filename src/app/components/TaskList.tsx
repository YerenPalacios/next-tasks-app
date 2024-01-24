import TaskBlock from "./TaskBlock"

export default function TaskList({ tasks }: { tasks: Task[] }) {
    const lateTasks = tasks.filter(t => (new Date(t.time) < new Date()) && t.status === 'IN_PROCESS')
    const todayTasks = tasks.filter(t => !(new Date(t.time) < new Date()) && (new Date(t.time).toDateString() === new Date().toDateString()) && t.status === 'IN_PROCESS')
    const doneTasks = tasks.filter(t => t.status == 'DONE')
    const moreTasks = tasks.filter(t => ((new Date(new Date(t.time).toDateString()) > new Date(new Date().toDateString()))) && t.status == 'IN_PROCESS')
    return <div className="absolute w-full h-[calc(100vh-220px)] top-[180px] rounded-t-3xl mt-10 bg-white overflow-y-auto">
        <div className="p-5 grid gap-5">
            {lateTasks.length !== 0 && <p className="text-sm text-slate-400 font-bold">Late</p>}
            {lateTasks && lateTasks.map((task, key) => (
                <TaskBlock key={key} {...task} />
            ))}

            {todayTasks.length !== 0 && <p className="text-sm text-slate-400 font-bold">Today</p>}
            {todayTasks && todayTasks.map((task, key) => (
                <TaskBlock key={key} {...task} />
            ))}

            {moreTasks.length !== 0 && <p className="text-sm text-slate-400 font-bold">More</p>}
            {moreTasks && moreTasks.map((task, key) => (
                <TaskBlock key={key} {...task} />
            ))}

            {doneTasks.length !== 0 && <p className="text-sm text-slate-400 font-bold">Done</p>}
            {doneTasks && doneTasks.map((task, key) => <TaskBlock key={key} {...task} />)}
            {!doneTasks.length && !lateTasks.length && !todayTasks.length && <div className="text-slate-500 text-sm flex w-full justify-center">There are no tasks...</div>}
        </div>
        <div className="bottom-0 fixed w-full h-10" style={{ boxShadow: '0px -20px 20px -10px rgb(255 255 255 / 92%) inset' }}></div>
    </div >
}