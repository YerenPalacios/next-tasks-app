import prisma from "@/app/db";

export async function createTask(task: any): Promise<Task> {
    const db_task = await prisma?.task.create({
        data: task
    })
    return {
        id: db_task.id,
        title: db_task.title,
        time: db_task.time.toISOString(),
        status: db_task.status
    }

}

export async function getCategoryTasks(categoryId: number): Promise<Category | undefined> {
    const category = await prisma?.category.findFirst({
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
                time: db_task.time.toISOString(),
                status: db_task.status
            })),
            title: category.title,
            tasks_count: category._count.tasks
        }

}

export async function getAllTasks(): Promise<{ count: number, tasks: Task[] } | undefined> {
    const tasks = await prisma?.task.findMany()
    const count = await prisma?.task.count()
    if (tasks)
        return {
            count,
            tasks: tasks.map(db_task => ({
                id: db_task.id,
                title: db_task.title,
                time: db_task.time.toISOString(),
                status: db_task.status
            }))
        }
}

export async function updateTask(id: number, status: string): Promise<Task> {
    try {
        const updatedTask = await prisma?.task.update({
            where: {
                id: id
            },
            data: {
                status: status
            }
        })
        return {
            id: updatedTask.id,
            title: updatedTask.title,
            time: updatedTask.time.toISOString(),
            status: updatedTask.status
        }
    } catch (error: any) {
        if (error.code === 'P2025') throw "Task not found"
        throw error
    }


}