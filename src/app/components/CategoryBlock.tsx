import Image from "next/image";
import Link from "next/link";

export default function CategoryBlock({ id, title, icon, tasks_count }: Category) {
    return <Link href={`/category/${id}`} className="bg-white rounded-md p-4 shadow-sm shadow-slate-200">
        <Image className="w-7 mb-6" width={200} height={200} src={icon} alt={icon} />
        <h2 className="font-bold text-slate-700 mb-1 mt-3">{title}</h2>
        <p className="text-slate-400 text-xs">{tasks_count} Tasks</p>
    </Link>
}