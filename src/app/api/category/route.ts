import { NextRequest, NextResponse } from "next/server";
import categoryService from "../services/categoryService";

export async function POST(req: NextRequest) {
    const data = await req.formData()
    const file = data.get('file') as File
    const title = data.get('title') as string
    try {
        await categoryService.createCategory(title, file)
    }catch (error){
        return NextResponse.json({message: error})
    }

    return NextResponse.json("creating")
}
