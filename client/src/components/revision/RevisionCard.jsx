function RevisionCard({ problem, color, handleRevise }) {
    return (
        <div
            className={`flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between rounded-2xl border p-4 sm:p-5 ${color === "red"
                    ? "border-red-800"
                    : color === "yellow"
                        ? "border-yellow-700"
                        : "border-green-800"
                } bg-slate-900`}
        >

            <div>

                <h3 className="text-lg sm:text-xl font-semibold text-white break-words">
                    {problem.title}
                </h3>

                <div className="mt-3 flex flex-wrap gap-2">

                    <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300">
                        {problem.topic}
                    </span>

                    <span className="rounded-full bg-blue-900/40 px-3 py-1 text-xs text-blue-300">
                        {problem.platform}
                    </span>

                    <span
                        className={`rounded-full px-3 py-1 text-xs ${problem.difficulty === "Easy"
                            ? "bg-green-900/40 text-green-400"
                            : problem.difficulty === "Medium"
                                ? "bg-yellow-900/40 text-yellow-400"
                                : "bg-red-900/40 text-red-400"
                            }`}
                    >
                        {problem.difficulty}
                    </span>

                </div>

                <p className={`mt-3 text-sm ${color === "red"
                    ? "text-red-400"
                    : color === "yellow"
                        ? "text-yellow-400"
                        : "text-green-400"
                    }`}>
                    {problem.revisionCount === 0
                        ? "First Revision Pending"
                        : `Revision #${problem.revisionCount}`}
                </p>

                <p className="mt-1 text-sm text-slate-400">
                    Next Revision:{" "}
                    {new Date(problem.nextRevisionDate).toLocaleDateString()}
                </p>

            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">

                <a
                    href={problem.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full sm:w-auto rounded-xl px-5 py-3 text-center text-white transition ${problem.link
                        ? "bg-blue-600 hover:bg-blue-700"
                        : "cursor-not-allowed bg-slate-700"
                        }`}
                >
                    Open Problem
                </a>

                <button
                    onClick={() => handleRevise(problem._id)}
                    className={`w-full sm:w-auto rounded-xl px-5 py-3 text-center text-white ${color === "red"
                        ? "bg-red-600 hover:bg-red-700"
                        : color === "yellow"
                            ? "bg-yellow-600 hover:bg-yellow-700"
                            : "bg-green-600 hover:bg-green-700"
                        }`}
                >
                    Mark Revised
                </button>

            </div>

        </div>
    );
}

export default RevisionCard;