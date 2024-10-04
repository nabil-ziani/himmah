import dayjs from "dayjs"
import { createClient } from "@/utils/supabase/server"
import { durationToSeconds } from "@/lib/utils"
import DashboardCard from "@/components/dashboard-card"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return redirect("/auth/login");
	}

	const { data: sessions, error } = await supabase.from('focus_sessions').select('*').eq('user_id', user.id)

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
			<DashboardCard daily={dailyMinutes} weekly={weeklyMinutes} monthly={monthlyMinutes} />
		</div>
	);
}
