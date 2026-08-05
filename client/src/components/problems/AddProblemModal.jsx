import { useState, useEffect } from "react";
import { createProblem, updateProblem } from "../../services/problemService";
import toast from "react-hot-toast";

function AddProblemModal({
    onClose,
    onSuccess,
    selectedProblem,
}) {


    const [formData, setFormData] = useState({
        title: "",
        topic: "",
        difficulty: "Easy",
        platform: "LeetCode",
        link: "",
        timeTaken: "",
        status: "Solved",
        notes: "",
    });

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        if (selectedProblem) {
            setFormData({
                title: selectedProblem.title || "",
                topic: selectedProblem.topic || "",
                difficulty: selectedProblem.difficulty || "Easy",
                platform: selectedProblem.platform || "LeetCode",
                link: selectedProblem.link || "",
                timeTaken: selectedProblem.timeTaken || "",
                status: selectedProblem.status || "Solved",
                notes: selectedProblem.notes || "",
            });
        }
    }, [selectedProblem]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            if (selectedProblem) {
                await updateProblem(selectedProblem._id, formData);
            } else {
                await createProblem(formData);
            }

            toast.success("Problem Added Successfully!");
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error("Failed to add problem");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">

            <div className="w-full max-w-lg rounded-2xl bg-slate-900 p-8">

                <h2 className="mb-6 text-2xl font-bold text-white">
                    {selectedProblem ? "Edit Problem" : "Add Problem"}
                </h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        name="title"
                        placeholder="Problem Title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                    />

                    <input
                        type="text"
                        name="topic"
                        placeholder="Topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                    />

                    <input
                        type="url"
                        name="link"
                        placeholder="LeetCode Link"
                        value={formData.link}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                    />

                    <div className="grid grid-cols-2 gap-4">

                        <select
                            name="difficulty"
                            value={formData.difficulty}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                        >
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>

                        <select
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                            className="rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                        >
                            <option>LeetCode</option>
                            <option>Codeforces</option>
                            <option>GeeksforGeeks</option>
                            <option>CodeChef</option>
                            <option>HackerRank</option>
                        </select>

                    </div>


                    <input
                        type="number"
                        name="timeTaken"
                        placeholder="Time Taken (minutes)"
                        value={formData.timeTaken}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                    />


                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white"
                    >
                        <option value="Solved">Solved</option>
                        <option value="Attempted">Attempted</option>
                        <option value="Todo">Todo</option>
                        <option value="Bookmarked">Bookmarked</option>
                    </select>


                    <textarea
                        name="notes"
                        placeholder="Write your notes, approach, mistakes..."
                        value={formData.notes}
                        onChange={handleChange}
                        rows={4}
                        className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-white resize-none"
                    />
                    

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-xl border border-slate-700 px-5 py-2 text-slate-300"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-xl bg-blue-600 px-5 py-2 text-white"
                        >
                            {loading
                                ? "Saving..."
                                : selectedProblem
                                    ? "Update"
                                    : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default AddProblemModal;