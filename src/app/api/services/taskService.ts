
import { createTask, updateTask } from '../repositories/taskRepository';

class TaskService {
    async createTask(title: string, time: string, categoryId: string) {
        return createTask({ title, time: new Date(time), categoryId: parseInt(categoryId), status: 'IN_PROCESS' })
    }

    async updateTask(id: number, status: string) {
        await updateTask(id, status)
    }
}
export default new TaskService()