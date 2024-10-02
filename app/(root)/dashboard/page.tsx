import { redirect } from "next/navigation";
import { durationToSeconds, formatFocusTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import dayjs from "dayjs";
import { createClient } from "@/utils/supabase/server";

export default async function DashboardPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/auth/login")
  }

  const { data: sessions, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', user.id)

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
    <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
      <h1 className='font-bold leading-none text-[#303030] text-4xl'>Dashboard</h1>
      {/* <p className="text-md text-gray-600">Keep up with your progress</p> */}

      <Card className='flex flex-col xl:max-w-[1800px] bg-white shadow-xl rounded-2xl'>
        <div className="flex h-[calc(100vh-250px)]">
          <section className="flex relative h-full flex-1 p-8 gap-x-36 justify-center max-md:pb-14 sm:px-14 overflow-hidden lg:w-[calc(100vw-400px)]">
            <div className="text-center">
              <h2 className="text-2xl font-semibold">Today</h2>
              <p>{formatFocusTime(dailyMinutes)}</p>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold">This Week</h2>
              <p>{formatFocusTime(weeklyMinutes)}</p>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold">This Month</h2>
              <p>{formatFocusTime(monthlyMinutes)}</p>
            </div>

            <div className="text-center">
              <h2 className="text-2xl font-semibold">Total Focus Time</h2>
              <p>{formatFocusTime(dailyMinutes)}</p>
            </div>
          </section>
        </div>
      </Card>
    </div>
  );
}
