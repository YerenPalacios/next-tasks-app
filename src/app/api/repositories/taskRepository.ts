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