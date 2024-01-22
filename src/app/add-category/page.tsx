import { getCategories } from "../api/repositories/categoriesRepository"
import NewCategoryForm from "../components/NewCategoryForm"

export default async function AddCategory() {

    return <section className="bg-white h-screen">
       <NewCategoryForm />
    </section>
}