"use client"
import moment from "moment"
import { useState } from "react"
import NewTaskHeader from "./FormHeader"

export default function NewTaskForm({ categories }: { categories: Category[] }) {
    const [date, setDate] = useState()
    return <div>
        <NewTaskHeader title="New task"/>
        <div className="p-5">
            <p className="text-slate-400">What are you planning?</p>
            <textarea className="caret-main-1 h-[100px] md:h-[150px] text-slate-600 caret w-full border-slate-200 border-b-2 resize-none outline-none" name="" id=""></textarea>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/alarm.png" alt="" /></div>
                <input className="hidden" onChange={(e) => setDate(e.target.value)} type="datetime-local" id="date" />
                <label className="text-slate-700" onClick={() => document.getElementById('date').showPicker()} htmlFor="date">
                    {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                </label>
            </div>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/price-tag.png" alt="" /></div>
                <select className="text-slate-500" name="" id="">
                    {(categories).map((category, key) => <option key={key} value={category.id}>{category.title}</option>)}

                </select>
            </div>

        </div>
        <button className="bg-main-1 text-slate-50 p-3 w-full">Create</button>
    </div>
}