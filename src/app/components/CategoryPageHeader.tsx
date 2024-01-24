"use client"
import Image from "next/image"
import Link from "next/link"
import useComponentVisible from "../hooks/componentVisible";
import { useParams } from "next/navigation";
import { useFetch } from "../hooks/fetch";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Error from "./Error";

export default function CategoryPageHeader({ tasks_count }: { tasks_count: number }) {
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false)
    const [isAlertVisible, setIsAlertVisible] = useState(false)
    const params = useParams()
    const router = useRouter()

    const onDeleteEnds = () => {
        router.push('/')
        router.refresh()
    }
    const { remove, error } = useFetch(onDeleteEnds)

    const handleDeleteCategory = () => {
        remove("/api/category", { categoryId: params.categoryId })
    }

    const closeAlert = () => {
        setIsAlertVisible(false)
    }

    const openAlert = () => {
        setIsAlertVisible(true)
    }

    return <header className="flex justify-between p-5">
        <Link href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
        </Link>
        <button onClick={() => setIsComponentVisible(true)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
            </svg>
        </button>
        {isComponentVisible && <div ref={ref} className="bg-white text-sm px-4 py-2 rounded-md text-slate-700 absolute right-6 top-12 slide-in-fwd-center">
            <button onClick={openAlert} className="flex text-red-600 items-center justify-center"><Image className="mr-2" width={15} height={15} src="/icons/trash.png" alt="trash" />Delete category</button>
        </div>}
        {isAlertVisible && <div className="fixed w-full h-screen bg-[#00000020] top-0 left-0 flex items-center justify-center z-20">
            <div className="absolute w-full h-screen z-20" onClick={closeAlert}></div>
            <div className="bg-white rounded-xl overflow-hidden z-30">
                <h1 className="w-full bg-red-400 text-white px-4 py-2">Confirm</h1>
                <div className="px-4 py-4 flex text-md">
                    <Image className="mr-4" width={50} height={50} src="/icons/alert-sign.png" alt="alert" />
                    <div>
                        <p>Are you sure you want to delete this category?</p>
                        <p>{tasks_count} tasks will be removed</p>
                    </div>

                </div>
                <div className="px-4 pb-4 flex gap-3 justify-end">
                    <button onClick={closeAlert} className="rounded-sm border-2 px-2 text-slate-400">No</button>
                    <button onClick={handleDeleteCategory} className="rounded-sm border-2 px-2 bg-red-400 text-white border-red-400">Yes</button>
                </div>
            </div>
        </div>}
        {error && <Error message={error} />}
    </header>
}