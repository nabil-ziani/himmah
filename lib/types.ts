import { Database, Tables } from "@/database.types"

export type Task = Database["public"]["Tables"]["tasks"]["Row"]

export type TaskStatus = Database["public"]["Enums"]["task_status"]

export type TaskType = {
    type: 'create' | 'edit'
    status: TaskStatus
}

export type Friendship = {
    id: string,
    status: string,
    friend: Tables<'profiles'>,
    user: Tables<'profiles'>
}

export type Affirmation = Tables<'affirmations'>

export type AffirmationOption = {
    label: string
    affirmations: Affirmation[]
}