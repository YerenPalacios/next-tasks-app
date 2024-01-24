import { NextRequest, NextResponse } from "next/server";
import taskService from "../services/taskService";

const EMPTY_VALUES = [undefined, null, '']

export async function POST(req: NextRequest) {
    const data = await req.json()
    const title = data.title
    const time = data.time
    const categoryId = data.categoryId
    try {
        const emptyFields: string[] = []
        if (EMPTY_VALUES.includes(title)) emptyFields.push('title')
        if (EMPTY_VALUES.includes(time)) emptyFields.push('time')
        if (EMPTY_VALUES.includes(categoryId)) emptyFields.push('category')
        if (emptyFields.length) throw 'Following fields are required ' + emptyFields.toString().replace(',', ', ')
        const task = await taskService.createTask(title, time, categoryId)
        return NextResponse.json(task, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}