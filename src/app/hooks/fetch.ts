import { useState } from "react"

export function useFetch(onRequestEnd: (data?: any) => void = () => { }) {

    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState()
    const [error, setError] = useState()

    const post = (path: string, payload: FormData | Object): void => {
        let body
        if (!(payload instanceof FormData)) {
            body = JSON.stringify(payload)
        } else {
            body = payload
        }

        setLoading(true)
        fetch(path, { method: "POST", body: body })
            .then(res => res.json())
            .then(data => {
                if (data.error)
                    throw data.error
                setResult(data)
                onRequestEnd(data)
            })
            .catch(error => {
                setError(error.toString())
                setTimeout(()=>setError(undefined), 5000)
            })
            .finally(() => setLoading(false))
    }
    return { post, result, loading, error }
}