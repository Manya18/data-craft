export type Task = {
    id: number,
    title: string,
    description: string,
    current_status: TaskStatus,
    start_date: string,
    final_date: string,
    priority: TaskPriority
}

export type TaskStatus = {
    id: number,
    title: string,
    is_system: boolean,
    task_id?: number
}

export type TaskPriority = {
    id: number,
    title: string
}