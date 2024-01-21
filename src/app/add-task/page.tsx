"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import moment from 'moment'
import { getCategories } from "../page"

export default function AddTask() {
    const router = useRouter()
    const [date, setDate] = useState()
    const [categories, setCategories] = useState<Category[]>([])

    useEffect(() => {
        const loadCategories = async () => {
            setCategories(await getCategories())
        }
        loadCategories()

    }, [])

    return <section className="bg-white h-screen">

        <header className="flex justify-between p-5 text-slate-700">
            <div></div>
            <h1 className="">New task</h1>
            <button onClick={() => router.back()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-slate-700">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
            </button>
        </header>

        <div className="p-5">
            <p className="text-slate-400">What are you planning?</p>
            <textarea className="caret-main-1 h-[100px] md:h-[150px] text-slate-600 caret w-full border-slate-200 border-b-2 resize-none outline-none" name="" id=""></textarea>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/alarm.png" alt="" /></div>
                <input className="hidden" onChange={(e) => setDate(e.target.value)} type="datetime-local" id="date" />
                <label className="text-slate-700" onClick={() => document.getElementById('date').showPicker()} htmlFor="date"> {moment(date).format('MMMM Do YYYY, h:mm:ss a')}</label>
            </div>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/price-tag.png" alt="" /></div>
                <select className="text-slate-500" name="" id="">
                    {(categories).map((category, key) => <option key={key} value={category.id}>{category.title}</option>)}

                </select>
            </div>

        </div>
        <button className="bg-main-1 text-slate-50 p-3 w-full">Create</button>

    </section>
}