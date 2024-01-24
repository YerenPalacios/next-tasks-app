export default function Error({ message }: { message: string }) {
    return <div className="z-10 fixed overflow-hidden bottom-5 right-5 ">
        <div
            className="slide-in-rightn text-sm relative rounded-md shadow-md border-l-2 border-red-500 bg-slate-200 text-slate-700 px-5 py-3"
        >{message}</div>
    </div>
}
