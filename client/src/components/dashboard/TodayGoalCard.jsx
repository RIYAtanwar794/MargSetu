import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getDashboardCards } from "../../services/dashboardService";

function TodayGoalCard() {
    const { user } = useAuth();

    const [goalData, setGoalData] = useState({
        target: user?.dailyGoal || 0,
        achieved: 0,
    });

    useEffect(() => {
        fetchGoal();
    }, []);


    const fetchGoal = async () => {
        try {
            const res = await getDashboardCards();
            setGoalData(res.cards.todaysGoal);
        } catch (err) {
            console.log(err);
        }
    };

    const dailyGoal = goalData.target || 0;
    const solvedToday = goalData.achieved || 0;

    const percentage =
        dailyGoal > 0
            ? Math.min((solvedToday / dailyGoal) * 100, 100)
            : 0;

    const displaySolved = Math.min(solvedToday, dailyGoal);
    const extraSolved = Math.max(solvedToday - dailyGoal, 0);


    return (
        <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <div className="flex items-center justify-between">
                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        🎯 Today's Goal
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Solve {dailyGoal} problems today.
                    </p>

                </div>

                <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm font-medium text-blue-400">
                    {displaySolved}/{dailyGoal}
                </span>
            </div>


            {/* Progress */}

            <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-800">
                <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                />
            </div>


            {/* Status Message */}

            {solvedToday >= dailyGoal && dailyGoal > 0 ? (

                <div className="mt-4">

                    <p className="text-sm font-semibold text-green-400">
                        🎉 Goal Completed!
                    </p>

                    {extraSolved > 0 && (
                        <p className="mt-1 text-sm text-blue-400">
                            🚀 +{extraSolved} extra {extraSolved === 1 ? "problem" : "problems"} solved today.
                        </p>
                    )}

                </div>

            ) : (

                <p className="mt-4 text-sm text-slate-400">
                    {dailyGoal - solvedToday} Problems Remaining
                </p>

            )}

            <div className="mt-4 flex items-center justify-between text-sm">

                <span className="text-slate-400">
                    {displaySolved}/{dailyGoal} Completed
                </span>

                <span className="font-semibold text-blue-400">
                    {Math.round(percentage)}%
                </span>

            </div>

        </div>
    );
}

export default TodayGoalCard;