import React, { useState } from "react";
import { FiPlus, FiTrash } from "react-icons/fi";
import { motion } from "framer-motion";
import { FaFire } from "react-icons/fa";
import { Task, TaskStatus } from "@/lib/types";
import { Database } from "@/database.types";

interface KanbanBoardProps {
    tasks: Task[]
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export const KanbanBoard = ({ tasks, setTasks }: KanbanBoardProps) => {

    return (
        <div className="h-screen w-full">
            <div className="flex h-full w-full gap-10 p-12 pr-0 justify-between">
                <Column
                    title="TODO"
                    status="new"
                    headingColor="bg-gray-100"
                    cards={tasks}
                    setCards={setTasks}
                />
                <Column
                    title="In progress"
                    status="active"
                    headingColor="bg-yellow-100"
                    cards={tasks}
                    setCards={setTasks}
                />
                <Column
                    title="Complete"
                    status="completed"
                    headingColor="bg-green-100"
                    cards={tasks}
                    setCards={setTasks}
                />
                <Column
                    title="Abandoned"
                    status="abandoned"
                    headingColor="bg-[#FF5C5C]/20"
                    cards={tasks}
                    setCards={setTasks}
                />
                <BurnBarrel setCards={setTasks} />
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
}

const Column = ({ title, headingColor, cards, status, setCards }: ColumnProps) => {
    const [active, setActive] = useState(false);

    const handleDragStart = (e: any, card: Task) => {
        e.dataTransfer.setData("cardId", card.id);
    };

    const handleDragEnd = (e: any) => {
        const cardId = e.dataTransfer.getData("cardId");

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
                    return <Card key={c.id} task={c} handleDragStart={handleDragStart} />;
                })}
                <DropIndicator beforeId={null} status={status} />
                <AddCard status={status} setCards={setCards} />
            </div>
        </div>
    );
};

interface CardProps {
    task: Task
    handleDragStart: (e: MouseEvent | TouchEvent | PointerEvent, card: Task) => void
}

const Card = ({ task, handleDragStart }: CardProps) => {
    return (
        <>
            <DropIndicator beforeId={task.id} status={task.status} />
            <motion.div
                layout
                layoutId={task.id.toString()}
                draggable="true"
                onDragStart={(e) => handleDragStart(e, task)}
                className="cursor-grab rounded border border-neutral-700 bg-neutral-800 p-3 active:cursor-grabbing"
            >
                <p className="text-sm text-neutral-100">{task.title}</p>
            </motion.div>
        </>
    );
};

const DropIndicator = ({ beforeId, status }: { beforeId: number | null, status: TaskStatus | null }) => {
    return (
        <div
            data-before={beforeId || "-1"}
            data-column={status}
            className="my-0.5 h-0.5 w-full bg-[#FF5C5C] opacity-0"
        />
    );
};

const BurnBarrel = ({ setCards }: any) => {
    const [active, setActive] = useState(false);

    const handleDragOver = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setActive(true);
    };

    const handleDragLeave = () => {
        setActive(false);
    };

    const handleDragEnd = (e: { dataTransfer: { getData: (arg0: string) => any; }; }) => {
        const cardId = e.dataTransfer.getData("cardId");

        setCards((pv: any[]) => pv.filter((c: { id: any; }) => c.id !== cardId));

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
            {active ? <FaFire className="animate-bounce" /> : <FiTrash />}
        </div>
    );
};

const AddCard = ({ status, setCards }: any) => {
    const [text, setText] = useState("");
    const [adding, setAdding] = useState(false);

    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        if (!text.trim().length) return;

        const newCard = {
            status,
            title: text.trim(),
            id: Math.random().toString(),
        };

        setCards((pv: any) => [...pv, newCard]);

        setAdding(false);
    };

    return (
        <>
            {adding ? (
                <motion.form layout onSubmit={handleSubmit}>
                    <textarea
                        onChange={(e) => setText(e.target.value)}
                        autoFocus
                        placeholder="Add new task..."
                        className="w-full rounded border border-[#FF5C5C] bg-[#FF5C5C]/20 p-3 text-sm text-neutral-600 placeholder-[#FF5C5C]/70 focus:outline-0 focus:outline-none"
                    />
                    <div className="mt-1.5 flex items-center justify-end gap-1.5">
                        <button
                            onClick={() => setAdding(false)}
                            className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex items-center gap-1.5 rounded bg-neutral-100 px-3 py-1.5 text-xs text-neutral-900 transition-colors hover:bg-neutral-300"
                        >
                            <span>Add</span>
                            <FiPlus />
                        </button>
                    </div>
                </motion.form>
            ) : (
                <motion.button
                    layout
                    onClick={() => setAdding(true)}
                    className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-700"
                >
                    <span>Add card</span>
                    <FiPlus />
                </motion.button>
            )}
        </>
    );
};