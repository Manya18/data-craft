import { TaskPriority } from "./taskType"

export type Stage = {
    id: number,
    project_id: number,
    title: string,
    current_status: StageStatus,
    start_date: string,
    final_status: string,
    budget: number,
    priority: TaskPriority
}

export type StageStatus = {
    id: number,
    title: string,
    is_system: boolean,
    stage_id?: number
}