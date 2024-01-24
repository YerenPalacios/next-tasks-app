import { NextRequest, NextResponse } from "next/server";
import taskService from "../services/taskService";
import { EMPTY_VALUES } from "@/app/constants";

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

export async function PUT(req: NextRequest) {
    const data = await req.json()
    const status = data.status
    const id = data.id
    try {
        const emptyFields: string[] = []
        if (EMPTY_VALUES.includes(id)) emptyFields.push('id')
        if (EMPTY_VALUES.includes(status)) emptyFields.push('status')
        if (emptyFields.length) throw 'Following fields are required ' + emptyFields.toString().replace(',', ', ')
        await taskService.updateTask(Number(id), status)
        return NextResponse.json({}, { status: 201 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}