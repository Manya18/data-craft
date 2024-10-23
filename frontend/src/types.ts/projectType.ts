import { ProjectUser } from "./userType"

export type Project = {
    id: number,
    title: string,
    goal: string,
    description: string,
    current_status: ProjectStatus,
    start_date: string,
    final_date: string,
    budget: number,
    members: ProjectUser[],
    documents: Document[]
}

export type ProjectStatus = {
    id: number,
    title: string,
    is_system: boolean,
    project_id?: number
}

export type Document = {
    id: number,
    document: Buffer
}