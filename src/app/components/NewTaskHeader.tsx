"use client"
import { useRouter } from "next/navigation"

export default function NewTaskHeader() {
    const router = useRouter()
    return <header className="flex justify-between p-5 text-slate-700">
        <div></div>
        <h1 className="">New task</h1>
        <button onClick={() => router.back()}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className="w-6 h-6 stroke-slate-700">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
    </header>
}