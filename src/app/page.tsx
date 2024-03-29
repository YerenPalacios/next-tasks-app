import { getCategories } from "./api/repositories/categoriesRepository";
import CreateTaskButton from "./components/CreateTaskButton";
import CategoryList from "./components/CategoryList";


export default async function Home() {
  const categories = await getCategories()
  return (
    <>
      <header className="flex justify-between p-5">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
        </svg>

      </header>
      <h1 className="font-bold text-xl p-5 text-slate-700 pt-0">Tasks</h1>
      <main className="grid grid-cols-2 md:grid-cols-3 gap-3 px-3">
      <CategoryList categories={categories}/>
      <CreateTaskButton />
      </main>
    </>

  );
}
