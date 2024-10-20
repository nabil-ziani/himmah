'use client'

import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import TaskModal from './task-modal'
import { KanbanBoard } from './kanban-board'
import { Task, TaskType } from '@/lib/types'
import { User } from '@supabase/supabase-js'
import { useSupabase } from '@/contexts/supabaseClient'
import toast from 'react-hot-toast'

interface TaskCardProps {
    user: User
}

const TaskCard = ({ user }: TaskCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<TaskType>({ type: 'create', status: 'new' })
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

    const supabase = useSupabase()

    useEffect(() => {
        const getData = async () => {
            const userId = user.id

            if (userId) {
                const { data: tasks, error } = await supabase
                    .from('tasks')
                    .select()
                    .eq('created_by', userId)

                if (error) {
                    toast.error(error.message)
                    console.error("Error fetching tasks:", error);
                } else {
                    setTasks(tasks || []);
                }
            }
        }
        getData()
    }, [])

    return (
        <Card className='flex flex-col w-full max-w-[1800px] bg-white shadow-xl rounded-2xl max-h-[calc(100vh-250px)]'>
            <section className="flex-1 sm:px-14 overflow-y-auto no-scrollbar">
                <KanbanBoard
                    supabase={supabase}
                    tasks={tasks}
                    setTasks={setTasks}
                    openModal={setIsOpen}
                    setMode={setMode}
                    setSelectedTask={setSelectedTask}
                />
            </section>

            <TaskModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setTasks={setTasks}
                mode={mode}
                task={selectedTask}
            />
        </Card>
    )
}

export default TaskCard