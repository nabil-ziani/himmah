'use client'

import { formatFocusTime } from "@/lib/utils"
import AnalyticsCard from "./analytics-card"
import { Card } from "./ui/card"
import { useState } from "react"
import { TbMessage } from "react-icons/tb";
import FeedbackModal from "./feedback-modal"

interface DashboardCardProps {
    daily: number
    weekly: number
    monthly: number
}

const DashboardCard = ({ daily, weekly, monthly }: DashboardCardProps) => {
    const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)

    return (
        <Card className='flex flex-col flex-grow w-full max-w-[1800px] bg-white shadow-xl rounded-2xl p-8 relative'>
            <div className="flex flex-row justify-evenly pt-8 gap-10 text-center text-white flex-wrap">
                <AnalyticsCard
                    title="Today"
                    description={formatFocusTime(daily)}
                    className="bg-orange-600/80"
                />
                <AnalyticsCard
                    title="This Week"
                    description={formatFocusTime(weekly)}
                    className="bg-blue-600/80"
                />
                <AnalyticsCard
                    title="This Month"
                    description={formatFocusTime(monthly)}
                    className="bg-purple-600/80"
                />
                <AnalyticsCard
                    title="Total Focus Time"
                    description={formatFocusTime(daily)}
                    className="bg-green-600/80"
                />
            </div>
            <div className="text-white bg-[#303030]/80  hover:bg-[#303030]/90 text-xl hover:cursor-pointer shadow-md rounded-full absolute bottom-5 right-5" onClick={() => setFeedbackModalOpen(true)}>
                <TbMessage className="m-4 h-7 w-7" color="white" />
            </div>
            <FeedbackModal isOpen={feedbackModalOpen} setIsOpen={setFeedbackModalOpen} />
        </Card>
    )
}

export default DashboardCard