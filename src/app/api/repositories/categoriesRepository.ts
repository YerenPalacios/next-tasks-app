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

export async function createCategory(category: any): Promise<Category> {
    const db_category = await prisma.category.create({
        data: category
    })
    return {
        id: db_category.id,
        icon: db_category.icon,
        title: db_category.title,
        tasks_count: 0
    }

}

export async function deleteCategory(id: number): Promise<any> {

    try {
        const category = await prisma?.category.findFirst({
            where: {
                id: id
            }
        })
        if (category) {
            await prisma.task.deleteMany({
                where: {
                    categoryId: { in: [id] }
                }
            })
            await prisma?.category.delete({
                where: {
                    id: id
                }
            })
            return category
        }

    } catch (error: any) {
        if (error.code === 'P2025') throw "Task not found"
        throw error
    }
}
