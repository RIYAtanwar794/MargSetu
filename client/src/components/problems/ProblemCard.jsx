import {
    Star,
    Edit,
    Trash2,
    ExternalLink,
} from "lucide-react";

function ProblemCard({
    problem,
    onEdit,
    onDelete,
    onToggleFavorite,
}) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-4 transition hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">

            {/* Top */}
            <div className="flex items-start justify-between gap-4">

                <div className="flex-1">

                    <h3 className="text-lg font-semibold text-white">
                        {problem.title}
                    </h3>

                    <span
                        className={`rounded-full px-3 py-1 text-xs
                            ${problem.status === "Solved"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-orange-500/20 text-orange-400"
                            }`}
                    >
                        {problem.status}
                    </span>


                    <div className="mt-3 flex flex-wrap gap-2">

                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                            {problem.topic}
                        </span>

                        <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-400">
                            {problem.platform}
                        </span>

                        <span
                            className={`rounded-full px-3 py-1 text-xs
              ${problem.difficulty === "Easy"
                                    ? "bg-green-500/20 text-green-400"
                                    : problem.difficulty === "Medium"
                                        ? "bg-yellow-500/20 text-yellow-400"
                                        : "bg-red-500/20 text-red-400"
                                }`}
                        >
                            {problem.difficulty}
                        </span>

                        {problem.timeTaken > 0 && (
                            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-sm text-blue-300">
                                ⏱ {problem.timeTaken} min
                            </span>
                        )}

                    </div>

                </div>

                <button
                    onClick={() => onToggleFavorite(problem)}
                    className="text-yellow-400"
                >
                    <Star
                        size={22}
                        fill={problem.isFavorite ? "currentColor" : "none"}
                    />
                </button>

            </div>

            {/* Bottom */}

            <div className="mt-6 flex flex-wrap items-center justify-end gap-3">

                <button
                    onClick={() => window.open(problem.link, "_blank")}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    <ExternalLink size={18} />
                </button>

                <button
                    onClick={() => onEdit(problem)}
                    className="rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                    <Edit size={18} />
                </button>

                <button
                    onClick={onDelete}
                    className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                >
                    <Trash2 size={18} />
                </button>

            </div>

        </div>
    );
}

export default ProblemCard;