import { useEffect } from "react";
import { getProblems } from "../../services/problemService";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { roadmapProblems } from "../../data/problems";
import { createProblem } from "../../services/problemService";
import toast from "react-hot-toast";


function TopicDetails() {

    const { company, topic } = useParams();
    const problems = roadmapProblems[topic] || [];
    const [adding, setAdding] = useState("");
    const [trackedProblems, setTrackedProblems] = useState(new Set());

    const solvedCount = problems.filter((problem) =>
        trackedProblems.has(problem.title)
    ).length;

    const progress =
        problems.length === 0
            ? 0
            : Math.round((solvedCount / problems.length) * 100);


    const fetchTrackedProblems = async () => {

        try {

            const res = await getProblems();

            const titles = new Set(
                res.data.problems.map((p) => p.title)
            );

            setTrackedProblems(titles);

        } catch (err) {

            console.error(err);

        }

    };

    const handleAddToTracker = async (problem) => {

        try {

            setAdding(problem.title);

            await createProblem({

                title: problem.title,
                link: problem.url,
                platform: problem.platform,
                difficulty: problem.difficulty,
                topic: topic.replace(/-/g, " "),
                roadmapCompany: company.replace(/-/g, " "),
                status: "Solved",

            });

            toast.success("Problem added to tracker successfully!");
            fetchTrackedProblems();

        } catch (err) {

            console.error(err);

            const message =
                err.response?.data?.message ||
                "Failed to add problem.";

            toast.error(message);

        } finally {

            setAdding("");

        }

    };

    useEffect(() => {
        fetchTrackedProblems();
    }, []);

    return (

        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-white">
                {topic.replace(/-/g, " ")}
            </h1>

            <p className="text-slate-400">
                Problems for {company.replace(/-/g, " ")}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="mb-3 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-white">
                        Progress
                    </h3>

                    <span className="text-sm font-medium text-blue-400">
                        {solvedCount} / {problems.length} Solved
                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{ width: `${progress}%` }}
                    />

                </div>

                <p className="mt-3 text-sm text-slate-400">
                    {progress}% Completed
                </p>

            </div>

            <div className="mt-10">

                <h2 className="mb-6 text-2xl font-bold text-white">
                    Problems
                </h2>

                <div className="space-y-4">

                    {problems.length === 0 ? (

                        <p className="text-slate-400">
                            No problems available yet.
                        </p>

                    ) : (

                        problems.map((problem, index) => (

                            <div
                                key={index}
                                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-blue-500"
                            >

                                <div>

                                    <h3 className="font-semibold text-white">
                                        {problem.title}
                                    </h3>

                                    <p className="mt-1 text-sm text-slate-400">
                                        {problem.platform}
                                    </p>

                                </div>

                                <div className="flex items-center gap-4">

                                    <span
                                        className={`rounded-full px-3 py-1 text-xs font-medium ${problem.difficulty === "Easy"
                                            ? "bg-green-500/20 text-green-400"
                                            : problem.difficulty === "Medium"
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-red-500/20 text-red-400"
                                            }`}
                                    >
                                        {problem.difficulty}
                                    </span>

                                    <a
                                        href={problem.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
                                    >
                                        Solve →
                                    </a>

                                    <button
                                        onClick={() => handleAddToTracker(problem)}
                                        disabled={
                                            adding === problem.title ||
                                            trackedProblems.has(problem.title)
                                        }
                                        className={`rounded-lg px-4 py-2 text-sm text-white transition
                                            ${trackedProblems.has(problem.title)
                                                ? "bg-slate-700 cursor-not-allowed"
                                                : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        {trackedProblems.has(problem.title)
                                            ? "✅ Already Added"
                                            : adding === problem.title
                                                ? "Adding..."
                                                : "➕ Add to Tracker"}
                                    </button>
                                </div>

                            </div>

                        ))

                    )}

                </div>

            </div>

        </div>

    );

}

export default TopicDetails;