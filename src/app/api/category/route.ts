import { NextRequest, NextResponse } from "next/server";
import categoryService from "../services/categoryService";
import { EMPTY_VALUES } from "@/app/constants";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const file = data.get('file') as File
    const title = data.get('title') as string
    try {
        const category = await categoryService.createCategory(title, file)
        return NextResponse.json(category, {status: 201})
    }catch (error: any){
        return NextResponse.json({message: error.message}, {status: 400})
    }
}

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    const id = data.categoryId
    try {
        const emptyFields: string[] = []
        if (EMPTY_VALUES.includes(id)) emptyFields.push('categoryId')
        if (emptyFields.length) throw 'Following fields are required ' + emptyFields.toString().replace(',', ', ')
        await categoryService.deleteCategory(Number(id))
        return NextResponse.json({}, { status: 200 })
    } catch (error) {
        return NextResponse.json({ error }, { status: 400 })
    }
}
