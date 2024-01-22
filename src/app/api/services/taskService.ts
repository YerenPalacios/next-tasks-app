
import { createTask } from '../repositories/taskRepository';

class TaskService {
    async createTask(title: string, time: string, categoryId: string) {
        createTask({ title, time: new Date(time), categoryId: parseInt(categoryId), status: 'IN_PROCESS' })
    }
}
export default new TaskService() as TaskService