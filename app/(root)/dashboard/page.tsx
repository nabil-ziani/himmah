import dayjs from "dayjs"
import { Card } from "@/components/ui/card"
import { createClient } from "@/utils/supabase/server"
import { durationToSeconds, formatFocusTime } from "@/lib/utils"
import DashboardCard from "@/components/dashboard-card"

export default async function DashboardPage() {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()

	const { data: sessions, error } = await supabase.from('focus_sessions').select('*').eq('user_id', user!.id)

	if (error) {
		console.error('Error fetching sessions:', error)
		return
	}

	const dailyMinutes = sessions.reduce((total, session) => total + Math.round(durationToSeconds(session.duration) / 60), 0)

	const startOfWeek = dayjs().startOf('week')
	const startOfMonth = dayjs().startOf('month')

	const weeklyMinutes = sessions
		.filter(session => dayjs(session.created_at).isAfter(startOfWeek))
		.reduce((total, session) => total + Math.round(durationToSeconds(session.duration) / 60), 0)

	const monthlyMinutes = sessions
		.filter(session => dayjs(session.created_at).isAfter(startOfMonth))
		.reduce((total, session) => total + Math.round(durationToSeconds(session.duration) / 60), 0)

	return (
		<div className="flex flex-col items-center gap-10 h-[calc(100vh-150px)]">
			<h1 className='font-bold leading-none text-[#303030] text-4xl'>Dashboard</h1>

			<Card className='flex flex-col flex-grow w-full max-w-[1800px] bg-white shadow-xl rounded-2xl'>
				<div className="flex flex-row justify-center p-8 gap-10 text-center text-white flex-wrap">
					<DashboardCard
						title="Today"
						description={formatFocusTime(dailyMinutes)}
						className="bg-orange-600/80"
					/>
					<DashboardCard
						title="This Week"
						description={formatFocusTime(weeklyMinutes)}
						className="bg-blue-600/80"
					/>
					<DashboardCard
						title="This Month"
						description={formatFocusTime(monthlyMinutes)}
						className="bg-purple-600/80"
					/>
					<DashboardCard
						title="Total Focus Time"
						description={formatFocusTime(dailyMinutes)}
						className="bg-green-600/80"
					/>
				</div>
			</Card>
		</div>
	);
}
