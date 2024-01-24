'use client'
import moment from "moment"
import { ChangeEvent, useState } from "react"
import { useFetch } from "../hooks/fetch"
import Error from "./Error"


export default function TaskBlock({ id, title, time, status }: Task) {
    const [currentStatus, setCurrentStatus] = useState<string>(status)

    const onUpdateEnds = () => {
        setCurrentStatus(currentStatus === 'DONE' ? 'IN_PROCESS' : 'DONE')
    }
    const { put, error } = useFetch(onUpdateEnds)

    const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        put('/api/task', {
            id: id,
            status: currentStatus === 'DONE' ? 'IN_PROCESS' : 'DONE'
        })
    }

    return <div className="flex justify-between">
        <div>
            <h3 className={`font-bold text-lg ${currentStatus === 'DONE' ? 'line-through text-main-1' : 'text-slate-600'}`}>{title}</h3>
            {/* <p className="text-sm text-slate-400">{moment(time).format('MMMM Do YYYY, h:mm:ss a')}</p> */}
            <p
                className={`text-sm ${((new Date(time) < new Date()) && status == 'IN_PROCESS') ? 'text-red-400' : 'text-slate-400'}`}
            >{moment(new Date(time)).fromNow()}</p>
        </div>
        <input checked={currentStatus === 'DONE'} onChange={handleChangeStatus} type="checkbox" name="" id="" />
        {error && <Error message={error} />}
    </div>
}
