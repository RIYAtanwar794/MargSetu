import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import StatCard from "../../components/dashboard/StatCard";
import TodayGoalCard from "../../components/dashboard/TodayGoalCard";
import { getDashboardCards } from "../../services/dashboardService";

function Overview() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {

            const res = await getDashboardCards();

            setDashboard(res.cards);

        } catch (err) {

            console.log(err);

        }
    };

    return (

        <div>

            {/* Welcome */}

            <div className="mb-10">

                <h1 className="text-4xl font-bold text-white">

                    Welcome back,
                    <span className="ml-3 text-blue-400">
                        {JSON.parse(localStorage.getItem("user"))?.name || "User"}
                    </span>

                    👋

                </h1>

                <p className="mt-4 text-lg text-slate-400">
                    Ready to continue your interview preparation today?
                </p>

            </div>

            {/* Stats */}

            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    icon="🔥"
                    title="Current Streak"
                    value={`${dashboard?.currentStreak ?? 0} Days`}
                    subtitle="Keep solving daily!"
                />

                <StatCard
                    icon="🎯"
                    title="Daily Goal"
                    value={dashboard?.todaysGoal?.target ?? 0}
                    subtitle="Problems today"
                />

                <StatCard
                    icon="📅"
                    title="Weekly Goal"
                    value={dashboard?.weeklyGoal?.target ?? 0}
                    subtitle="Problems this week"
                />

                <StatCard
                    icon="🏢"
                    title="Target Company"
                    value={dashboard?.targetCompany || "Not Set"}
                    subtitle="Dream Company"
                />

            </div>

            <TodayGoalCard />

        </div>

    );
}

export default Overview;