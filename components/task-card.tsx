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
    const [tasks, setTasks] = useState<Task[]>([])

    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const userId = user.id

            if (userId) {
                const { data: tasks, error } = await supabase
                    .from('tasks')
                    .select()
                    .eq('user_id', userId)

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
                    {/* <div className="flex justify-end items-center">
                        <Button size={"lg"} className="bg-gray-900/60  hover:bg-gray-900/70 text-white text-xl hover:cursor-pointer" onClick={() => setIsOpen(true)}>
                            <ClipboardPlus className="mr-3" />
                            New Task
                        </Button>
                    </div> */}
                    <KanbanBoard tasks={tasks} setTasks={setTasks} supabase={supabase} createTask={setIsOpen} />
                </section>
            </div>

            <SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
        </Card>
    )
}

export default TaskCard