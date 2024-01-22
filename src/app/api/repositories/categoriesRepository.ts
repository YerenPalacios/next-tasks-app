import prisma from "@/app/db";

export async function getCategories(){
    return await prisma.category.findMany()
}