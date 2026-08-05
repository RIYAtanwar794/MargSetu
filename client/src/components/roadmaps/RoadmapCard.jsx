import { useNavigate } from "react-router-dom";


function RoadmapCard({
    title,
    description,
    progress,
    totalProblems,
    percentage,
    color,
}) {

    const navigate = useNavigate();

    console.log({
        title,
        progress,
        totalProblems,
        percentage,
    });

    return (
        <div
            onClick={() =>
                navigate(
                    `/dashboard/roadmaps/${title
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`
                )
            }

            className={`cursor-pointer rounded-2xl border bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${color === "blue"
                ? "border-blue-800 hover:border-blue-500 hover:shadow-blue-500/10"
                : color === "orange"
                    ? "border-orange-800 hover:border-orange-500 hover:shadow-orange-500/10"
                    : color === "green"
                        ? "border-green-800 hover:border-green-500 hover:shadow-green-500/10"
                        : color === "red"
                            ? "border-red-800 hover:border-red-500 hover:shadow-red-500/10"
                            : "border-cyan-800 hover:border-cyan-500 hover:shadow-cyan-500/10"
                }`}
        >
            <div className="flex items-center justify-between">

                <h2 className="text-xl font-bold text-white">
                    {title}
                </h2>

                <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${color === "blue"
                        ? "bg-blue-600/20 text-blue-400"
                        : color === "orange"
                            ? "bg-orange-600/20 text-orange-400"
                            : color === "green"
                                ? "bg-green-600/20 text-green-400"
                                : color === "red"
                                    ? "bg-red-600/20 text-red-400"
                                    : "bg-cyan-600/20 text-cyan-400"
                        }`}
                >
                    {percentage}%
                </span>

            </div>

            <p className="mt-3 text-sm leading-6 text-slate-400">
                {description}
            </p>

            <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800">

                <div
                    className={`h-full rounded-full ${color === "blue"
                        ? "bg-blue-500"
                        : color === "orange"
                            ? "bg-orange-500"
                            : color === "green"
                                ? "bg-green-500"
                                : color === "red"
                                    ? "bg-red-500"
                                    : "bg-cyan-500"
                        }`}
                    style={{ width: `${percentage}%` }}
                />

            </div>

            <p className="mt-3 text-sm text-slate-500">
                {progress} / {totalProblems} Problems Completed
            </p>

            <button
                className={`mt-6 w-full rounded-xl py-3 font-medium text-white transition ${color === "blue"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : color === "orange"
                        ? "bg-orange-600 hover:bg-orange-700"
                        : color === "green"
                            ? "bg-green-600 hover:bg-green-700"
                            : color === "red"
                                ? "bg-red-600 hover:bg-red-700"
                                : "bg-cyan-600 hover:bg-cyan-700"
                    }`}
            >
                Start Roadmap →
            </button>
        </div>
    );
}

export default RoadmapCard;