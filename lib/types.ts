import { Database } from "@/database.types"

export type Task = Database["public"]["Tables"]["tasks"]["Row"]

export type TaskStatus = Database["public"]["Enums"]["task_status"]

export type TaskType = {
    type: 'create' | 'edit'
    status: TaskStatus
}