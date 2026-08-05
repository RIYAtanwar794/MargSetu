function ProductPreview() {
    return (
        <div className="w-[390px] rounded-3xl border border-slate-700 bg-slate-900 shadow-2xl">

            {/* Browser Header */}

            <div className="flex items-center gap-2 border-b border-slate-700 p-4">
                <div className="h-3 w-3 rounded-full bg-red-400"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                <div className="h-3 w-3 rounded-full bg-green-400"></div>

                <span className="ml-3 text-sm text-slate-400">
                    MargSetu Preview
                </span>

            </div>


            {/* Content */}

            <div className="space-y-6 p-6">

                {/* Roadmap */}

                <div>

                    <h3 className="font-semibold text-white">
                        📚 DSA Roadmap
                    </h3>

                    <div className="mt-4 space-y-3">

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-slate-400">
                                <span>Arrays</span>
                                <span className="text-green-400">Completed</span>
                            </div>

                            <div className="h-2 rounded-full bg-slate-700">

                                <div className="h-2 w-[90%] rounded-full bg-blue-500"></div>

                            </div>

                        </div>

                        <div>
                            <div className="mb-1 flex justify-between text-sm text-slate-400">
                                <span>Strings</span>
                                <span className="text-purple-400">In Progress</span>
                            </div>

                            <div className="h-2 rounded-full bg-slate-700">

                                <div className="h-2 w-[70%] rounded-full bg-purple-500"></div>

                            </div>

                        </div>

                    </div>

                </div>


                {/* AI */}

                <div className="rounded-2xl bg-slate-800 p-4">

                    <p className="font-semibold text-blue-400">

                        🤖 AI Mentor

                    </p>

                    <p className="mt-2 text-sm leading-6 text-slate-300">

                        You're making great progress!

                        Based on your recent activity,
                        it's the perfect time to revise
                        Sliding Window before moving
                        to Trees.

                        Your consistency is improving.

                    </p>

                </div>


                {/* Goal */}

                <div className="rounded-2xl border border-slate-700 p-4">

                    <p className="font-semibold text-white">

                        🎯 Today's Focus

                    </p>

                    <ul className="mt-3 space-y-2 text-sm text-slate-400">
                        <li>✔ Solve 2 Array Problems</li>
                        <li>✔ Revise Sliding Window</li>
                        <li>✔ Review Previous Notes</li>
                    </ul>

                </div>

            </div>

        </div>
    );
}

export default ProductPreview;