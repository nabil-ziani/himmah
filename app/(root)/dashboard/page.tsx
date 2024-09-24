import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { durationToSeconds, formatFocusTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default async function DashboardPage() {
  const supabase = createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/login");
  }

  const { data: sessions, error } = await supabase
    .from('focus_sessions')
    .select('*')
    .eq('user_id', user.id)

  if (error) {
    console.error('Error fetching sessions:', error);
    return;
  }

  const dailyMinutes = sessions.reduce((total, session) => total + Math.floor(durationToSeconds(session.duration) / 60), 0);

  const startOfWeek = dayjs().startOf('week'); // Begin van de week
  const startOfMonth = dayjs().startOf('month'); // Begin van de maand

  const weeklyMinutes = sessions
    .filter(session => dayjs(session.created_at).isAfter(startOfWeek))
    .reduce((total, session) => total + Math.floor(durationToSeconds(session.duration) / 60), 0);

  const monthlyMinutes = sessions
    .filter(session => dayjs(session.created_at).isAfter(startOfMonth))
    .reduce((total, session) => total + Math.floor(durationToSeconds(session.duration) / 60), 0);


  console.log(`Vandaag: ${formatFocusTime(dailyMinutes)}`);
  console.log(`Deze week: ${formatFocusTime(weeklyMinutes)}`);
  console.log(`Deze maand: ${formatFocusTime(monthlyMinutes)}`);

  return (
    <div className="flex flex-col max-h-[calc(100vh-80px)] gap-10 justify-center items-center">
      <h1 className='font-bold leading-none text-[#303030] text-4xl'>Analytics</h1>

      <Card className="flex gap-20 mt-10">
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
      </Card>
    </div>
  );
}
