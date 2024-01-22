import { NextRequest, NextResponse } from "next/server";
import taskService from "../services/taskService";

export async function POST(req: NextRequest) {
    const data = await req.json()
    const title = data.title
    const time = data.time
    const categoryId = data.categoryId
    try {
        await taskService.createTask(title, time, categoryId)
    } catch (error) {
        return NextResponse.json({ message: error })
    }

    return NextResponse.json("creating")
}