interface Category {
    id: number,
    icon: string,
    title: string,
    tasks_count: number,
    tasks?: Task[]
}

interface Task {
    id: number,
    title: string,
    time: string,
    status:  string,
    
}