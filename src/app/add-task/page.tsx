import { getCategories } from "../api/repositories/categoriesRepository"
import NewTaskForm from "../components/NewTaskForm"

export default async function AddTask() {

    return <section className="bg-white h-screen">
       <NewTaskForm categories={await getCategories()}/>
    </section>
}