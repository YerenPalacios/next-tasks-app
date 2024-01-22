'use client'

import moment from "moment"
import { useState } from "react"

function TaskBlock({ title, time, status }: Task) {
    const [currentStatus, setCurrentStatus] = useState<string>(status)
    return <div className="flex justify-between">
        <div>
            <h3 className={`font-bold text-lg ${currentStatus === 'DONE' ? 'line-through text-main-1' : 'text-slate-600'}`}>{title}</h3>
            {/* fix hours */}
            <p className="text-sm text-slate-400">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </div>
        <input onChange={(e) => setCurrentStatus(e.target.checked ? 'DONE' : 'IN_PROCESS')} type="checkbox" name="" id="" />
    </div>
}


export default function TaskList({ tasks }: { tasks: Task[] }) {
    return <div className="absolute w-full h-[calc(100vh-220px)] top-[180px] rounded-t-3xl mt-10 bg-white overflow-y-auto">
        <div className="p-5 grid gap-5">
            
            {tasks.length ? tasks.map((task, key) => <TaskBlock key={key} {...task} />) : <div className="text-slate-500 text-sm flex w-full justify-center">There are no tasks...</div>}
        </div>
        <div className="bottom-0 fixed w-full h-10" style={{ boxShadow: '0px -20px 20px -10px rgb(255 255 255 / 92%) inset' }}></div>
    </div>
}