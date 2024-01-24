import { NextRequest, NextResponse } from "next/server";
import categoryService from "../services/categoryService";

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
