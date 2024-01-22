import { useFetch } from "./fetch"

export function useCategoryService(onPostEnd: () => void) {
    const { post, result, loading } = useFetch(onPostEnd)

    const sendCategoryData = (body: FormData): void => {
        post('api/category', body)
    }
    return { sendCategoryData, result, loading }
}