export async function createTask(task: any): Promise<Task> {
    const db_task = await prisma.task.create({
        data: task
    })
    return {
        id: db_task.id,
        title: db_task.title,
        time: db_task.time.toDateString(),
        status: db_task.status
    }

}

export async function getCategoryTasks(categoryId: number): Promise<Category[]> {
    const category = await prisma.category.findFirst({
        where: {
            id: categoryId
        },
        include: {
            tasks: true,
            _count: {
                select: { tasks: true }
            }
        }
    })
    if (category)
        return {
            icon: category.icon,
            id: category.id,
            tasks: category.tasks.map(db_task => ({
                id: db_task.id,
                title: db_task.title,
                time: db_task.time.toDateString(),
                status: db_task.status
            })),
            title: category.title,
            tasks_count: category._count.tasks
        }

}