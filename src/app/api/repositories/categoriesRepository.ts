import prisma from "@/app/db";


export async function getCategories(): Promise<Category[]> {
    const db_categories = await prisma.category.findMany({
        include: {
            _count: {
                select: { tasks: true }
            }
        }
    })
    return db_categories.map(category => (
        {
            id: category.id,
            icon: category.icon,
            title: category.title,
            tasks_count: category._count.tasks
        }
    ))

}