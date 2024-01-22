import Link from "next/link";

export default function CreateTaskButton(){
    return <Link href='/add-task' className="absolute top-[88%] right-10 bg-main-1 p-2 rounded-full shadow-md shadow-slate-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#fff" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    </Link>
}