"use client"
import { ChangeEvent, LegacyRef, useEffect, useRef, useState } from "react"
import FormHeader from "./FormHeader"
import { useCategoryService } from "../hooks/categoryHooks"
import Loading from "./loading"
import { useRouter } from "next/navigation"

export default function NewCategoryForm() {

    const [filePreview, setFilePreview] = useState<string>()
    const [file, setFile] = useState<File>()
    const name = useRef<HTMLInputElement | null>(null)
    const router = useRouter()

    const onCreateEnds = ()=>{
        router.push("/")
    }

    const { sendCategoryData, loading, result } = useCategoryService(onCreateEnds)

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return

        const file = files[0]
        setFile(file)
        const url = URL.createObjectURL(file)
        setFilePreview(url)
        setTimeout(() => {
            URL.revokeObjectURL(url)
        }, 20);

    }

    const handleCreateCategory = () => {
        const formData = new FormData()
        if (!file || !name.current) return
        formData.append('file', file)
        formData.append('title', name.current.value)
        sendCategoryData(formData)
    }



    return <div>
        {loading && <Loading />}
        <FormHeader title="New Category" />
        <div className="p-5">
            <p className="text-slate-400">Add a category name</p>
            <input ref={name} className="caret-main-1 text-slate-600 caret w-full border-slate-200 border-b-2 resize-none outline-none" />
            <div className="flex gap-3 items-center my-4">
                <div className="w-4"><img src="/icons/image-gallery.png" alt="" /></div>
                <input onChange={handleFileChange} className="hidden" type="file" id="file" accept=".png,.jpg" />
                <label className="text-slate-700 block" htmlFor="file">Upload your file</label>
                {filePreview && <div className="w-10"><img src={filePreview} alt="" /></div>}
            </div>
        </div>

        <button onClick={handleCreateCategory} className="bg-main-1 text-slate-50 p-3 w-full">Create</button>
    </div>
}