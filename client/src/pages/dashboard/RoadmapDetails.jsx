import { useEffect, useState } from "react";
import { getProblems } from "../../services/problemService";
import { roadmapProblems } from "../../data/problems";
import { useParams } from "react-router-dom";
import { roadmaps } from "../../data/roadmaps";
import { useNavigate } from "react-router-dom";

function RoadmapDetails() {

    const [topicProgress, setTopicProgress] = useState({});
    const { company } = useParams();
    const navigate = useNavigate();

    const roadmap = roadmaps.find(
        (item) =>
            item.title.toLowerCase().replace(/\s+/g, "-") === company
    );


    if (!roadmap) {
        return (
            <h1 className="text-3xl font-bold text-red-500">
                Roadmap Not Found
            </h1>
        );
    }

    const [progress, setProgress] = useState({
        solved: 0,
        total: 0,
    });


    const fetchProgress = async () => {

        try {

            const res = await getProblems();

            const allProblems = res.data.problems;

            let totalProblems = 0;
            const topicStats = {};

            roadmap.roadmap.forEach((topic) => {

                const key = topic
                    .toLowerCase()
                    .replace(/\s+/g, "-");

                const total = roadmapProblems[key]?.length || 0;

                totalProblems += total;

                const solved = allProblems.filter(
                    (problem) =>
                        problem.topic?.trim().toLowerCase() ===
                        topic.trim().toLowerCase()
                ).length;

                topicStats[topic] = {
                    solved,
                    total,
                };

            });

            const solvedCount = Object.values(topicStats).reduce(
                (sum, item) => sum + item.solved,
                0
            );

            setProgress({
                solved: solvedCount,
                total: totalProblems,
            });

            setTopicProgress(topicStats);

        } catch (err) {

            console.error(err);

        }

    };


    useEffect(() => {
        fetchProgress();

    }, []);


    return (
        <div className="space-y-8">

            <h1 className="text-4xl font-bold text-white">
                {roadmap.title}
            </h1>

            <p className="text-slate-400">
                {roadmap.description}
            </p>

            <div className="mt-8 rounded-2xl border border-slate-800 bg-slate-900 p-6">

                <div className="mb-3 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-white">
                        Overall Progress
                    </h3>

                    <span className="text-sm font-medium text-blue-400">
                        {progress.solved} / {progress.total} Solved
                    </span>

                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-700">

                    <div
                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                        style={{
                            width: `${progress.total === 0
                                ? 0
                                : (progress.solved / progress.total) * 100
                                }%`,
                        }}
                    />

                </div>

                <p className="mt-3 text-sm text-slate-400">

                    {progress.total === 0
                        ? 0
                        : Math.round(
                            (progress.solved / progress.total) * 100
                        )}

                    % Completed

                </p>

            </div>

            <div className="mt-10">

                <h2 className="mb-6 text-2xl font-bold text-white">
                    Topics
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                    {roadmap.roadmap.map((topic, index) => (

                        <div
                            key={index}
                            onClick={() =>
                                navigate(
                                    `/dashboard/roadmaps/${company}/${topic
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`
                                )
                            }
                            className="cursor-pointer rounded-xl border border-slate-800 bg-slate-900 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                        >

                            <div className="flex items-center justify-between">

                                <h3 className="font-semibold text-white">
                                    {topic}
                                </h3>

                                <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-700">

                                    <div
                                        className="h-full rounded-full bg-blue-500 transition-all duration-500"
                                        style={{
                                            width: `${topicProgress[topic]?.total
                                                ? (topicProgress[topic].solved /
                                                    topicProgress[topic].total) *
                                                100
                                                : 0
                                                }%`,
                                        }}
                                    />

                                </div>

                                <p className="mt-2 text-xs text-slate-400">

                                    {topicProgress[topic]?.total
                                        ? Math.round(
                                            (topicProgress[topic].solved /
                                                topicProgress[topic].total) *
                                            100
                                        )
                                        : 0}
                                    % Complete

                                </p>

                                <span
                                    className={`rounded-full px-3 py-1 text-xs font-medium
                                         ${topicProgress[topic]?.solved === topicProgress[topic]?.total &&
                                            topicProgress[topic]?.total > 0
                                            ? "bg-green-500/20 text-green-400"
                                            : topicProgress[topic]?.solved > 0
                                                ? "bg-yellow-500/20 text-yellow-400"
                                                : "bg-slate-700 text-slate-300"
                                        }`}
                                >
                                    {topicProgress[topic]?.solved === topicProgress[topic]?.total &&
                                        topicProgress[topic]?.total > 0
                                        ? "✅ Completed"
                                        : topicProgress[topic]?.solved > 0
                                            ? `${topicProgress[topic].solved} / ${topicProgress[topic].total}`
                                            : "⏳ Pending"}
                                </span>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
}

export default RoadmapDetails;