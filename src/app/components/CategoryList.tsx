import Link from "next/link";
import Image from "next/image";
import CategoryBlock from "./CategoryBlock";

export default function CategoryList({ categories }: { categories: Category[] }) {
    return <>

        <Link href="/category/all" className="bg-white rounded-md p-4 shadow-sm shadow-slate-200">
            <Image className="w-7 mb-6" width={200} height={200} src="/icons/all.png" alt="All tasks" />
            <h2 className="font-bold text-slate-700 mb-1 mt-3">All</h2>
            <p className="text-slate-400 text-xs">{categories.reduce((acc, obj) => (acc + obj.tasks_count), 0)} Tasks</p>
        </Link>
        {
            categories.map(
                (category, key) => <CategoryBlock
                    {...category}
                    key={key}
                />
            )
        }
        <Link href={`/add-category`} className="bg-slate-50 flex items-center justify-center rounded-md p-4 shadow-sm shadow-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#aaa" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
        </Link>
    </>
}