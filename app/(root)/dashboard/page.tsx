import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import DashboardCard from "@/components/dashboard-card"

export default async function DashboardPage() {
	const supabase = createClient()

	const { data: { user } } = await supabase.auth.getUser()

	if (!user) {
		return redirect("/auth/login");
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select('*')
		.eq('id', user.id)
		.single()

	if (!profile) return;

	const { data: total_focus_time, error } = await supabase
		.rpc('get_total_focus_time', { userid: user.id });

	return (
		<div className="flex flex-col items-center gap-10 h-[calc(100vh-150px)]">
			<h1 className='font-bold leading-none text-[#303030] text-4xl'>Dashboard</h1>
			<DashboardCard daily={profile.day_focus_time} weekly={profile.week_focus_time} monthly={profile.month_focus_time} total={total_focus_time || 0} />
		</div>
	);
}