import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { FaFire } from "react-icons/fa";
import { HiTrash } from "react-icons/hi";
import { motion } from "framer-motion";
import { Task, TaskStatus, TaskType } from "@/lib/types";
import { Database } from "@/database.types";
import { Clock } from "lucide-react";
import { SupabaseClient } from "@supabase/supabase-js";

interface KanbanBoardProps {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
    supabase: SupabaseClient<Database>
    openModal: React.Dispatch<React.SetStateAction<boolean>>
    setMode: React.Dispatch<React.SetStateAction<TaskType>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>
}

export const KanbanBoard = ({ tasks, setTasks, supabase, openModal, setMode, setSelectedTask }: KanbanBoardProps) => {
    return (
        <div className="h-screen w-full">
            <div className="flex h-full w-full gap-10 p-12 pr-0 justify-between">
                <Column
                    title="TODO"
                    status="new"
                    headingColor="bg-gray-100"
                    cards={tasks}
                    setCards={setTasks}
                    supabase={supabase}
                    openModal={openModal}
                    setMode={setMode}
                    setSelectedTask={setSelectedTask}
                />
                <Column
                    title="In progress"
                    status="active"
                    headingColor="bg-yellow-100"
                    cards={tasks}
                    setCards={setTasks}
                    supabase={supabase}
                    openModal={openModal}
                    setMode={setMode}
                    setSelectedTask={setSelectedTask}

                />
                <Column
                    title="Complete"
                    status="completed"
                    headingColor="bg-green-100"
                    cards={tasks}
                    setCards={setTasks}
                    supabase={supabase}
                    openModal={openModal}
                    setMode={setMode}
                    setSelectedTask={setSelectedTask}

                />
                <Column
                    title="Abandoned"
                    status="abandoned"
                    headingColor="bg-[#FF5C5C]/20"
                    cards={tasks}
                    setCards={setTasks}
                    supabase={supabase}
                    openModal={openModal}
                    setMode={setMode}
                    setSelectedTask={setSelectedTask}

                />
                <BurnBarrel setCards={setTasks} supabase={supabase} />
            </div>
        </div>
    );
};

interface ColumnProps {
    title: string
    headingColor: string
    cards: Task[]
    status: Database["public"]["Enums"]["task_status"]
    setCards: React.Dispatch<React.SetStateAction<Task[]>>
    supabase: SupabaseClient<Database>
    openModal: React.Dispatch<React.SetStateAction<boolean>>
    setMode: React.Dispatch<React.SetStateAction<TaskType>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>
}

const Column = ({ title, headingColor, cards, status, setCards, supabase, openModal, setMode, setSelectedTask }: ColumnProps) => {
    const [active, setActive] = useState(false);

    const updateTaskStatus = async (taskId: number, newStatus: TaskStatus) => {
        const { error } = await supabase
            .from('tasks')
            .update({ status: newStatus })
            .eq('id', taskId)

        if (error) {
            console.error("Error updating task status:", error.message);
        }
    };

    const handleDragStart = (e: any, card: Task) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = async (e: any) => {
        const cardId = Number(e.dataTransfer.getData("cardId"))

        setActive(false);
        clearHighlights([]);

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);

            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, status };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);

            // Update the task status in Supabase
            await updateTaskStatus(cardId, status);
        }
    };

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        highlightIndicator(e);

        setActive(true);
    };

    const clearHighlights = (els: any[]) => {
        const indicators = els || getIndicators();

        indicators.forEach((i) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: any) => {
        const indicators = getIndicators();

        clearHighlights(indicators);

        const el = getNearestIndicator(e, indicators);

        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (e: { clientY: number; }, indicators: any[]) => {
        const DISTANCE_OFFSET = 50;

        const el = indicators.reduce(
            (closest: { offset: number; }, child: { getBoundingClientRect: () => any; }) => {
                const box = child.getBoundingClientRect();

                const offset = e.clientY - (box.top + DISTANCE_OFFSET);

                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const getIndicators = () => {
        return Array.from(document.querySelectorAll(`[data-column="${status}"]`));
    };

    const handleDragLeave = () => {
        clearHighlights([]);
        setActive(false);
    };

    const filteredCards = cards.filter((c) => c.status === status);

    return (
        <div className="w-56 shrink-0 overflow-hidden">
            <div className="mb-3 flex items-center justify-between">
                <h3 className={`font-medium text-xl text-[#303030] py-2 px-6 rounded-lg ${headingColor}`}>{title}</h3>
            </div>
            <div
                onDrop={handleDragEnd}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`overflow-y-scroll h-full w-full transition-colors ${active ? "bg-neutral-800/50" : "bg-neutral-800/0"
                    }`}
            >
                {filteredCards.map((c) => {
                    return (
                        <Card
                            key={c.id}
                            task={c}
                            handleDragStart={handleDragStart}
                            setMode={setMode}
                            openModal={openModal}
                            setSelectedTask={setSelectedTask}
                        />
                    )
                })}
                <DropIndicator beforeId={null} status={status} />
                <AddCard setMode={setMode} openModal={openModal} status={status} />
            </div>
        </div>
    );
};

interface CardProps {
    task: Task
    handleDragStart: (e: MouseEvent | TouchEvent | PointerEvent, card: Task) => void
    setMode: React.Dispatch<React.SetStateAction<TaskType>>
    openModal: React.Dispatch<React.SetStateAction<boolean>>
    setSelectedTask: React.Dispatch<React.SetStateAction<Task | undefined>>
}
const Card = ({ task, handleDragStart, setMode, openModal, setSelectedTask }: CardProps) => {

    const handleClick = () => {
        setMode({ type: 'edit', status: task.status })
        setSelectedTask(task)
        openModal(true)
    }

    return (
        <>
            <DropIndicator beforeId={task.id} status={task.status} />
            <motion.div
                layout
                layoutId={task.id.toString()}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task)}
                className="cursor-grab rounded-lg bg-neutral-500 my-2 p-3 active:cursor-grabbing"
                onClick={handleClick}
            >
                <div className="flex justify-between gap-2 text-neutral-100">
                    <p>{task.title}</p>

                    <p className="flex items-center text-sm">
                        <Clock height={15} color="white" /> {task.focus_time}
                    </p>
                </div>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, status }: { beforeId: number | null, status: TaskStatus | null }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={status}
            className="my-0.5 h-0.5 rounded-xl w-full bg-[#FF5C5C] opacity-0"
        />
    );
};

const BurnBarrel = ({ setCards, supabase }: any) => {
    const [active, setActive] = useState(false);

    const deleteTask = async (taskId: number) => {
        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskId);

        if (error) {
            console.error("Error deleting task:", error);
            return false;
        }

        return true;
    };

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = async (e: { dataTransfer: { getData: (arg0: string) => any; }; }) => {
        const cardId = Number(e.dataTransfer.getData("cardId"))

        // Verwijder lokaal
        setCards((prev: any[]) => {
            const updatedCards = prev.filter((c: { id: number }) => c.id !== cardId);

            return updatedCards;
        });

        // Verwijder de kaart uit Supabase
        const success = await deleteTask(cardId);

        if (!success) {
            console.error("Failed to delete task from Supabase");
        }

        setActive(false);
    };

    return (
        <div
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`grid h-full w-80 shrink-0 place-content-center rounded-lg text-3xl ${active
                ? "bg-[#FF5C5C]/20 text-[#FF5C5C]"
                : "bg-neutral-500/20 text-neutral-500"
                }`}
        >
            {active ? <FaFire className="animate-bounce" /> : <HiTrash />}
        </div>
    );
}

interface AddCardProps {
    openModal: React.Dispatch<React.SetStateAction<boolean>>
    setMode: React.Dispatch<React.SetStateAction<TaskType>>
    status: TaskStatus
}
const AddCard = ({ openModal, setMode, status }: AddCardProps) => {
    const handleClick = () => {
        setMode({ type: 'create', status: status })
        openModal(true)
    }

    return (
        <div className="mt-1.5">
            <motion.button
                layout
                onClick={handleClick}
                className="flex items-center gap-1.5 rounded bg-neutral-100 px-3 py-1.5 text-xs text-neutral-900 transition-colors hover:bg-neutral-300"
            >
                <span>Add task</span>
                <FiPlus />
            </motion.button>
        </div>
    );
}; 