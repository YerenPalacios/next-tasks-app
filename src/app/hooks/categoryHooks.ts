import { useState } from "react"

export function useCategoryService(onPostEnd: ()=>void) {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()

    const sendCategoryData = (body: FormData): void => {
        setLoading(true)
        fetch('api/category', { method: "POST", body: body })
        .then(res=>res.json())
        .then(data=>{setResult(data), onPostEnd()})
        .finally(()=>setLoading(false))
    }
    return { sendCategoryData, result, loading}
}