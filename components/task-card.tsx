'use client'

import React, { useEffect, useState } from 'react'
import { Card } from './ui/card'
import SpringModal from './spring-modal'
import { KanbanBoard } from './kanban-board'
import { createClient } from '@/utils/supabase/client'
import { Task } from '@/lib/types'
import { User } from '@supabase/supabase-js'

interface TaskCardProps {
    user: User
}

const TaskCard = ({ user }: TaskCardProps) => {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<'create' | 'edit'>('create')
    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | undefined>(undefined)

    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const userId = user.id

            if (userId) {
                const { data: tasks, error } = await supabase
                    .from('tasks')
                    .select()
                    .eq('created_by', userId)

                if (error) {
                    console.error("Error fetching tasks:", error);
                } else {
                    setTasks(tasks || []);
                }
            }
        }
        getData()
    }, [])

    return (
        <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
            <div className="flex h-[calc(100vh-250px)]">
                <section className="flex relative h-full flex-1 flex-col p-8 max-md:pb-14 sm:px-14 overflow-hidden lg:w-[100vw]">
                    <KanbanBoard
                        supabase={supabase}
                        tasks={tasks}
                        setTasks={setTasks}
                        openModal={setIsOpen}
                        setMode={setMode}
                        setSelectedTask={setSelectedTask}
                    />
                </section>
            </div>

            <SpringModal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                setTasks={setTasks}
                type={mode}
                task={selectedTask}
            />
        </Card>
    )
}

export default TaskCard