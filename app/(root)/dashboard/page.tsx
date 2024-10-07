import dayjs from "dayjs"
import { createClient } from "@/utils/supabase/server"
import DashboardCard from "@/components/dashboard-card"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return redirect("/auth/login");
	}

	const { data: profile, error } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single()


	console.log(profile)

	if (error) {
		console.error('Error fetching sessions:', error)
		return
	}

	const { data: sessions } = await supabase.from('focus_sessions').select('*').eq('user_id', user.id)


	// const startOfWeek = dayjs().startOf('week')
	// const startOfMonth = dayjs().startOf('month')

	return (
		<div className="flex flex-col items-center gap-10 h-[calc(100vh-150px)]">
			<h1 className='font-bold leading-none text-[#303030] text-4xl'>Dashboard</h1>
			<DashboardCard daily={profile.day_focus_time} weekly={profile.week_focus_time} monthly={profile.month_focus_time} />
		</div>
	);
}
