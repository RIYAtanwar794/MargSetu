function RevisionPreview() {
    return (
        <div className="w-full max-w-sm p-5 sm:max-w-md sm:p-6 rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h3 className="text-xl font-bold text-white">
                        Revision Planner
                    </h3>

                    <p className="text-sm text-slate-400">
                        This Week
                    </p>
                </div>

                <div className="w-fit rounded-xl bg-blue-600/20 px-3 py-2 text-blue-400 font-semibold">
                    🔥 18 Day Streak
                </div>

            </div>


            {/* Revision List */}

            <div className="mt-8 space-y-4">

                <Task
                    topic="Sliding Window"
                    day="Today"
                    completed
                />

                <Task
                    topic="Binary Search"
                    day="Tomorrow"
                />

                <Task
                    topic="Trees"
                    day="Friday"
                />

                <Task
                    topic="Graphs"
                    day="Saturday"
                />

            </div>

        </div>
    );
}

function Task({ topic, day, completed }) {
    return (

        <div className="flex flex-col gap-3 rounded-xl bg-slate-800 px-4 py-3 sm:flex-row sm:items-center sm:justify-between rounded-xl bg-slate-800 px-4 py-3">

            <div>

                <h4 className="font-medium text-white">
                    {topic}
                </h4>

                <p className="text-sm text-slate-400">
                    {day}
                </p>

            </div>

            <div>

                {completed ? (
                    <span className="rounded-full bg-green-500/20 px-3 py-1 text-sm text-green-400">
                        Done
                    </span>
                ) : (
                    <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
                        Pending
                    </span>
                )}

            </div>

        </div>

    );
}

export default RevisionPreview;