"use client"
import moment from "moment"
import { useRef, useState } from "react"
import NewTaskHeader from "./FormHeader"
import { useFetch } from "../hooks/fetch"

export default function NewTaskForm({ categories }: { categories: Category[] }) {
    const [date, setDate] = useState<string>()
    const [categoryIcon, setCategoryIcon] = useState<string>("/icons/price-tag.png")

    const { post } = useFetch()

    const dateInputRef = useRef<HTMLInputElement | null>(null)
    const textAreaRef = useRef<HTMLTextAreaElement | null>(null)
    const categorySelectRef = useRef<HTMLSelectElement | null>(null)

    const handleCreateTask = () => {
        const taskPayload = {
            title: textAreaRef?.current?.value,
            time: dateInputRef?.current?.value,
            categoryId: categorySelectRef?.current?.value
        }
        debugger
        post('api/task', taskPayload)

    }

    return <div>
        <NewTaskHeader title="New task" />
        <div className="p-5">
            <p className="text-slate-400">What are you planning?</p>
            <textarea ref={textAreaRef} className="caret-main-1 h-[100px] md:h-[150px] text-slate-600 caret w-full border-slate-200 border-b-2 resize-none outline-none" name="" id=""></textarea>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/alarm.png" alt="" /></div>
                <input ref={dateInputRef} className="hidden" onChange={(e) => setDate(e.target.value)} type="datetime-local" id="date" />
                <label className="text-slate-700 cursor-pointer" onClick={() => dateInputRef?.current?.showPicker()} htmlFor="date">
                    {moment(date).format('MMMM Do YYYY, h:mm:ss a')}
                </label>
            </div>
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src={categoryIcon} alt="" /></div>
                <select ref={categorySelectRef} onChange={(e) => {
                    let category = categories.filter(item => item.id.toString() === e.target.value)
                    if (category) setCategoryIcon(category[0].icon)
                }} className="text-slate-500 outline-none cursor-pointer" name="" id="">
                    <option value="">-- Category</option>
                    {(categories).map((category, key) =>
                        <option
                            key={key}
                            value={category.id}
                        >
                            {category.title}
                        </option>)
                    }
                </select>
            </div>

        </div>
        <button onClick={handleCreateTask} className="bg-main-1 text-slate-50 p-3 w-full">Create</button>
    </div>
}