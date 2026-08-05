import { useEffect, useState } from "react";
import { getAnalytics, getInsights } from "../../services/analyticsService";
import {
    Trophy,
    Target,
    Clock3,
    BookOpen,
    Heart,
    CalendarClock,
} from "lucide-react";

import {
    Brain,
    AlertTriangle,
    BarChart3,
} from "lucide-react";

import {
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    BarChart,
    Bar,
} from "recharts";

import { CalendarDays, Laptop } from "lucide-react";


function Analytics() {

    const [analytics, setAnalytics] = useState(null);
    const [insights, setInsights] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const analyticsRes = await getAnalytics();
                const insightsRes = await getInsights();

                setAnalytics(analyticsRes);
                setInsights(insightsRes.insights);

            } catch (error) {

                console.error(error);

            } finally {

                setLoading(false);

            }

        };

        fetchData();

    }, []);

    if (loading) {

        return (

            <div className="flex h-[70vh] items-center justify-center">

                <p className="text-lg text-slate-400">
                    Loading Analytics...
                </p>

            </div>

        );

    }

    const overview = analytics.overview;

    const stats = [
        {
            title: "Solved",
            value: overview.solved,
            icon: Trophy,
            color: "text-green-400",
        },
        {
            title: "Accuracy",
            value: `${overview.accuracy}%`,
            icon: Target,
            color: "text-blue-400",
        },
        {
            title: "Avg Time",
            value: `${overview.avgSolveTime} min`,
            icon: Clock3,
            color: "text-orange-400",
        },
        {
            title: "Problems",
            value: overview.totalProblems,
            icon: BookOpen,
            color: "text-purple-400",
        },
        {
            title: "Revision Due",
            value: overview.revisionDue,
            icon: CalendarClock,
            color: "text-red-400",
        },
        {
            title: "Favorites",
            value: overview.favorites,
            icon: Heart,
            color: "text-pink-400",
        },
    ];

    const difficultyData = [
        {
            name: "Easy",
            value: analytics.difficulty.easy,
        },
        {
            name: "Medium",
            value: analytics.difficulty.medium,
        },
        {
            name: "Hard",
            value: analytics.difficulty.hard,
        },
    ];

    const COLORS = [
        "#22c55e",
        "#f59e0b",
        "#ef4444",
    ];

    const getInsightStyle = (type) => {
        switch (type) {

            case "weakest_topic":
                return {
                    icon: <AlertTriangle size={26} />,
                    border: "border-orange-500",
                    bg: "bg-orange-500/10",
                    color: "text-orange-400",
                    title: "Weak Topic",
                };

            case "slowest_topic":
                return {
                    icon: <Clock3 size={26} />,
                    border: "border-yellow-500",
                    bg: "bg-yellow-500/10",
                    color: "text-yellow-400",
                    title: "Slow Solving",
                };

            case "stale_revision":
                return {
                    icon: <CalendarClock size={26} />,
                    border: "border-red-500",
                    bg: "bg-red-500/10",
                    color: "text-red-400",
                    title: "Revision Reminder",
                };

            case "avg_time_by_difficulty":
                return {
                    icon: <BarChart3 size={26} />,
                    border: "border-blue-500",
                    bg: "bg-blue-500/10",
                    color: "text-blue-400",
                    title: "Difficulty Insight",
                };

            default:
                return {
                    icon: <Brain size={26} />,
                    border: "border-violet-500",
                    bg: "bg-violet-500/10",
                    color: "text-violet-400",
                    title: "AI Insight",
                };
        }
    };

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-white">
                Analytics Dashboard
            </h1>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                {stats.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="group relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                        >

                            <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-500/5 blur-3xl transition group-hover:bg-blue-500/10"></div>
                            <div className="flex items-center justify-between">

                                <div>

                                    <p className="text-sm text-slate-400">

                                        {item.title}

                                    </p>

                                    <h2 className="mt-3 text-4xl font-bold text-white">

                                        {item.value}

                                    </h2>

                                    <p className="mt-2 text-sm text-slate-500">

                                        {item.title === "Solved" && "Keep solving consistently 🚀"}

                                        {item.title === "Accuracy" && "Higher is better"}

                                        {item.title === "Avg Time" && "Average per solved problem"}

                                        {item.title === "Problems" && "Total tracked"}

                                        {item.title === "Revision Due" && "Don't break your revision streak"}

                                        {item.title === "Favorites" && "Quick access list"}

                                    </p>

                                </div>


                                <div
                                    className={`rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 p-4 ${item.color} border border-slate-700 transition group-hover:scale-110`}
                                >

                                    <Icon size={28} />

                                </div>


                            </div>

                        </div>

                    );

                })}

            </div>

            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-8">

                    <h2 className="text-2xl font-bold text-white">
                        Monthly Progress
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Problems solved over time.
                    </p>

                </div>

                <div className="h-80">

                    <ResponsiveContainer width="100%" height="100%">

                        <LineChart data={analytics.monthlyProgress}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                stroke="#334155"
                            />

                            <XAxis
                                dataKey="month"
                                stroke="#94a3b8"
                            />

                            <YAxis
                                stroke="#94a3b8"
                            />

                            <Tooltip
                                contentStyle={{
                                    background: "#0f172a",
                                    border: "1px solid #334155",
                                    borderRadius: "12px",
                                    color: "#fff",
                                }}
                            />

                            <Line
                                type="monotone"
                                dataKey="solved"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                dot={{
                                    r: 5,
                                }}
                            />

                        </LineChart>

                    </ResponsiveContainer>

                </div>

            </div>

            <div className="mt-10 grid gap-8 lg:grid-cols-2">

                {/* Difficulty Distribution */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="mb-2 text-2xl font-bold text-white">
                        Difficulty Distribution
                    </h2>

                    <p className="mb-8 text-slate-400">
                        Problems grouped by difficulty.
                    </p>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <PieChart>

                                <Pie
                                    data={difficultyData}
                                    dataKey="value"
                                    nameKey="name"
                                    outerRadius={95}
                                    innerRadius={55}
                                >

                                    {difficultyData.map((entry, index) => (

                                        <Cell
                                            key={index}
                                            fill={COLORS[index]}
                                        />

                                    ))}

                                </Pie>

                                <Tooltip
                                    contentStyle={{
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        borderRadius: "12px",
                                    }}
                                />

                            </PieChart>

                        </ResponsiveContainer>

                    </div>

                </div>

                {/* Topic Distribution */}

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

                    <h2 className="mb-2 text-2xl font-bold text-white">
                        Top Topics
                    </h2>

                    <p className="mb-8 text-slate-400">
                        Most practiced DSA topics.
                    </p>

                    <div className="h-80">

                        <ResponsiveContainer>

                            <BarChart
                                data={analytics.topicDistribution}
                                layout="vertical"
                            >

                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#334155"
                                />

                                <XAxis
                                    type="number"
                                    stroke="#94a3b8"
                                />

                                <YAxis
                                    dataKey="topic"
                                    type="category"
                                    stroke="#94a3b8"
                                    width={90}
                                />

                                <Tooltip
                                    contentStyle={{
                                        background: "#0f172a",
                                        border: "1px solid #334155",
                                        borderRadius: "12px",
                                    }}
                                />

                                <Bar
                                    dataKey="count"
                                    fill="#3b82f6"
                                    radius={[0, 6, 6, 0]}
                                />

                            </BarChart>

                        </ResponsiveContainer>

                    </div>

                </div>

            </div>

            <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-8">

                    <h2 className="text-2xl font-bold text-white">
                        Roadmap Progress
                    </h2>

                    <p className="mt-2 text-slate-400">
                        Your progress across company roadmaps.
                    </p>

                </div>

                <div className="space-y-6">

                    {analytics.roadmapProgress.length === 0 ? (

                        <p className="text-slate-500">
                            No roadmap progress yet.
                        </p>

                    ) : (

                        analytics.roadmapProgress.map((item) => (

                            <div key={item.company}>

                                <div className="mb-2 flex items-center justify-between">

                                    <span className="font-medium text-white">

                                        {item.company}

                                    </span>

                                    <span className="text-sm text-slate-400">

                                        {item.solved} Solved

                                    </span>

                                </div>

                                <div className="h-3 overflow-hidden rounded-full bg-slate-800">

                                    <div
                                        className="h-full rounded-full bg-blue-500 transition-all duration-700"
                                        style={{
                                            width: `${Math.min(item.solved * 2, 100)}%`,
                                        }}
                                    />

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

            <div className="mt-12 rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h2 className="text-2xl font-bold text-white">
                            Recent Activity
                        </h2>

                        <p className="mt-2 text-slate-400">
                            Your latest solved problems.
                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    {analytics.recentActivity.length === 0 ? (

                        <div className="rounded-xl border border-dashed border-slate-700 py-10 text-center">

                            <div className="text-5xl">📚</div>

                            <h3 className="mt-4 text-lg font-semibold text-white">
                                No solved problems yet
                            </h3>

                            <p className="mt-2 text-slate-500">
                                Start solving problems to build your activity history.
                            </p>

                        </div>

                    ) : (

                        analytics.recentActivity.map((item) => (

                            <div
                                key={item._id}
                                className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-5 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                            >

                                <div className="flex items-center gap-5">

                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-xl">

                                        ✅

                                    </div>

                                    <div>

                                        <h3 className="font-semibold text-white">

                                            {item.title}

                                        </h3>

                                        <div className="mt-2 flex flex-wrap items-center gap-3">

                                            <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">

                                                {item.topic}

                                            </span>

                                            <span
                                                className={`rounded-full px-3 py-1 text-xs font-medium
                                    ${item.difficulty === "Easy"
                                                        ? "bg-green-500/20 text-green-400"
                                                        : item.difficulty === "Medium"
                                                            ? "bg-yellow-500/20 text-yellow-400"
                                                            : "bg-red-500/20 text-red-400"
                                                    }`}
                                            >

                                                {item.difficulty}

                                            </span>

                                            <span className="flex items-center gap-1 text-xs text-slate-400">

                                                <Laptop size={14} />

                                                {item.platform}

                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex items-center gap-2 text-sm text-slate-500">

                                    <CalendarDays size={16} />

                                    {new Date(item.solvedDate).toLocaleDateString()}

                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>


        </div>

    );

}

export default Analytics;