import { useEffect, useState } from "react";
import AddProblemModal from "../../components/problems/AddProblemModal";
import { getProblems, deleteProblem, updateProblem } from "../../services/problemService";
import { Heart } from "lucide-react";
import ProblemCard from "../../components/problems/ProblemCard";
import toast from "react-hot-toast";

function Problems() {

    const [problems, setProblems] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedProblem, setSelectedProblem] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [difficultyFilter, setDifficultyFilter] = useState("All");

    useEffect(() => {
        fetchProblems();
    }, []);

    const fetchProblems = async () => {
        try {
            const res = await getProblems();
            setProblems(res.data.problems);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };


    const toggleFavorite = async (problem) => {
        try {
            await updateProblem(problem._id, {
                ...problem,
                isFavorite: !problem.isFavorite,
            });

            fetchProblems();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (problem) => {
        setSelectedProblem(problem);
        setShowModal(true);
    };


    const filteredProblems = problems.filter((problem) => {
        const matchesSearch =
            problem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            problem.topic.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesDifficulty =
            difficultyFilter === "All" ||
            problem.difficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;
    });


    const totalProblems = problems.length;

    const solvedProblems = problems.filter(
        (p) => p.status === "Solved"
    ).length;

    const averageTime =
        problems.length > 0
            ? Math.round(
                problems.reduce(
                    (sum, p) => sum + (p.timeTaken || 0),
                    0
                ) / problems.length
            )
            : 0;

    const easyCount = problems.filter(
        (p) => p.difficulty === "Easy"
    ).length;

    const mediumCount = problems.filter(
        (p) => p.difficulty === "Medium"
    ).length;

    const hardCount = problems.filter(
        (p) => p.difficulty === "Hard"
    ).length;


    const handleDelete = async () => {
        try {

            await deleteProblem(deleteId);
            toast.success("Problem deleted successfully!");
            setDeleteId(null);
            fetchProblems();

        } catch (err) {
            console.error(err);
            toast.error("Failed to delete problem.");
        }
    };


    return (
        <div className="space-y-8">

            {/* Heading */}

            <div>

                <h1 className="text-4xl font-bold text-white">
                    Problem Tracker
                </h1>

                <p className="mt-3 text-slate-400">
                    Track every coding problem and monitor your progress.
                </p>

            </div>


            {/* Stats */}

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Total Problems
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        {totalProblems}
                    </h2>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Solved
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-green-400">
                        {solvedProblems}
                    </h2>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Avg Time
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-blue-400">
                        {averageTime} min
                    </h2>
                </div>

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
                    <p className="text-sm text-slate-400">
                        Difficulty
                    </p>

                    <div className="mt-3 flex gap-4">

                        <span className="text-green-400">
                            Easy {easyCount}
                        </span>

                        <span className="text-yellow-400">
                            Medium {mediumCount}
                        </span>

                        <span className="text-red-400">
                            Hard {hardCount}
                        </span>

                    </div>

                </div>

            </div>



            {/* Search */}

            <div className="flex gap-4">

                <input
                    type="text"
                    placeholder="Search by title or topic..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-900 px-5 py-4 text-white outline-none transition focus:border-blue-500"
                />

                <button
                    onClick={() => {
                        setSelectedProblem(null);
                        setShowModal(true);
                    }}
                    className="min-w-[190px] rounded-xl bg-blue-600 px-8 py-3 whitespace-nowrap text-lg font-semibold text-white transition hover:bg-blue-700"
                >
                    + Add Problem
                </button>

            </div>


            {/* Filters */}

            <div className="flex flex-wrap gap-3">

                <button
                    onClick={() => setDifficultyFilter("All")}
                    className={`rounded-xl px-5 py-2 ${difficultyFilter === "All"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    All
                </button>

                <button
                    onClick={() => setDifficultyFilter("Easy")}
                    className={`rounded-xl px-5 py-2 ${difficultyFilter === "Easy"
                        ? "bg-green-600 text-white"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    Easy
                </button>

                <button
                    onClick={() => setDifficultyFilter("Medium")}
                    className={`rounded-xl px-5 py-2 ${difficultyFilter === "Medium"
                        ? "bg-yellow-500 text-white"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    Medium
                </button>

                <button
                    onClick={() => setDifficultyFilter("Hard")}
                    className={`rounded-xl px-5 py-2 ${difficultyFilter === "Hard"
                        ? "bg-red-600 text-white"
                        : "border border-slate-700 text-slate-300 hover:bg-slate-800"
                        }`}
                >
                    Hard
                </button>

            </div>

            {/* Card */}

            <div className="space-y-5">

                {filteredProblems.map((problem) => (

                    <ProblemCard
                        key={problem._id}
                        problem={problem}
                        onEdit={handleEdit}
                        onDelete={() => setDeleteId(problem._id)}
                        onToggleFavorite={toggleFavorite}
                    />

                ))}

            </div>

            {
                showModal && (
                    <AddProblemModal
                        selectedProblem={selectedProblem}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedProblem(null);
                        }}
                        onSuccess={fetchProblems}
                    />
                )
            }

            {deleteId && (

                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

                    <div className="w-[90%] max-w-sm rounded-2xl bg-slate-900 p-6 border border-slate-700">

                        <h2 className="text-xl font-bold text-white">
                            Delete Problem?
                        </h2>

                        <p className="mt-3 text-slate-400">
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">

                            <button
                                onClick={() => setDeleteId(null)}
                                className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300 hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleDelete}
                                className="rounded-xl bg-red-600 px-5 py-2 text-white hover:bg-red-700"
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Problems;