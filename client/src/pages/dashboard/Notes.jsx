import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { notes } from "../../data/notes";

function Notes() {

    const [selectedTopic, setSelectedTopic] = useState(notes[0]);

    const [sidebarOpen, setSidebarOpen] = useState(true);

    const [search, setSearch] = useState("");

    const filteredNotes = notes.filter((note) =>
        note.topic.toLowerCase().includes(search.toLowerCase())
    );

    return (

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">

            {/* LEFT PANEL */}

            <aside className="lg:sticky lg:top-0 lg:self-start">

                <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

                    <h2 className="mb-6 text-2xl font-bold text-white">
                        📚 Topics
                    </h2>

                    <div className="flex gap-2 overflow-x-auto pb-2 lg:max-h-[75vh] lg:flex-col lg:overflow-y-auto lg:overflow-x-hidden">

                        {notes.map((item) => (

                            <button
                                key={item.topic}
                                onClick={() => setSelectedTopic(item)}
                                className={`whitespace-nowrap rounded-xl px-5 py-3 text-left font-medium transition-all duration-200 lg:w-full lg:whitespace-normal ${selectedTopic.topic === item.topic
                                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                                        : "bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                                    }`}
                            >
                                {item.topic}
                            </button>

                        ))}

                    </div>

                </div>

            </aside>

            {/* RIGHT PANEL */}

            <div className="min-w-0 flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-8">

                <h1 className="mb-6 text-4xl font-bold text-white">
                    {selectedTopic.topic}
                </h1>

                <div className="rounded-xl bg-slate-950 p-6">

                    <h2 className="mb-3 text-xl font-semibold text-blue-400">
                        Definition
                    </h2>

                    <p className="leading-8 text-slate-300">
                        {selectedTopic.definition}
                    </p>

                </div>

                <div className="mt-8 rounded-xl bg-slate-950 p-6">

                    <h2 className="mb-4 text-xl font-semibold text-green-400">
                        Time Complexity
                    </h2>

                    <div className="overflow-hidden rounded-xl border border-slate-800">

                        <table className="w-full">

                            <thead className="bg-slate-800">

                                <tr>

                                    <th className="px-5 py-3 text-left text-white">
                                        Operation
                                    </th>

                                    <th className="px-5 py-3 text-left text-white">
                                        Complexity
                                    </th>

                                </tr>

                            </thead>

                            <tbody>

                                {selectedTopic.complexity.map((item, index) => (

                                    <tr
                                        key={index}
                                        className="border-t border-slate-800"
                                    >

                                        <td className="px-5 py-3 text-slate-300">
                                            {item.operation}
                                        </td>

                                        <td className="px-5 py-3 font-semibold text-green-400">
                                            {item.value}
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="mt-8 grid gap-6 lg:grid-cols-2">

                    {/* Interview Tips */}

                    <div className="rounded-xl border border-green-800 bg-green-500/10 p-6">

                        <h2 className="mb-4 text-xl font-semibold text-green-400">
                            💡 Interview Tips
                        </h2>

                        <ul className="space-y-3">

                            {selectedTopic.tips.map((tip, index) => (

                                <li
                                    key={index}
                                    className="flex gap-3 text-slate-300"
                                >
                                    <span className="text-green-400">✓</span>

                                    <span>{tip}</span>

                                </li>

                            ))}

                        </ul>

                    </div>

                    {/* Common Mistakes */}

                    <div className="rounded-xl border border-red-800 bg-red-500/10 p-6">

                        <h2 className="mb-4 text-xl font-semibold text-red-400">
                            ⚠️ Common Mistakes
                        </h2>

                        <ul className="space-y-3">

                            {selectedTopic.mistakes.map((mistake, index) => (

                                <li
                                    key={index}
                                    className="flex gap-3 text-slate-300"
                                >
                                    <span className="text-red-400">✗</span>

                                    <span>{mistake}</span>

                                </li>

                            ))}

                        </ul>

                    </div>

                </div>

                <div className="mt-8 rounded-2xl border border-blue-800 bg-blue-500/10 p-8">

                    <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-blue-400">
                        🧩 Common Patterns
                    </h2>

                    <div className="flex flex-wrap gap-4">

                        {selectedTopic.patterns.map((pattern, index) => (

                            <div
                                key={index}
                                className="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-5 py-2.5 transition hover:border-blue-500"
                            >
                                <div className="h-2.5 w-2.5 rounded-full bg-violet-500"></div>

                                <span className="text-sm font-medium text-white">
                                    {pattern}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>


                <div className="mt-12">

                    <h2 className="mb-8 flex items-center gap-3 text-3xl font-bold text-white">
                        📚 Learn More
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2">

                        {/* Complete Notes */}

                        <a
                            href={selectedTopic.resources.notes}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-blue-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                        >

                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-blue-500/10 text-5xl">
                                📘
                            </div>

                            <h3 className="text-xl font-bold text-white">
                                Complete Notes
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Read detailed explanations, theory, examples and interview concepts.
                            </p>

                            <div className="mt-6 rounded-lg bg-blue-600 py-2.5 text-sm text-center font-semibold text-white transition group-hover:bg-blue-700">
                                Open Notes ↗
                            </div>

                        </a>

                        {/* Video Playlist */}

                        <a
                            href={selectedTopic.resources.video}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-red-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-red-500 hover:shadow-xl hover:shadow-red-500/10"
                        >

                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-red-500/10 text-5xl">
                                🎥
                            </div>

                            <h3 className="text-xl font-bold text-white">
                                Video Playlist
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Watch the best curated YouTube playlist for this topic.
                            </p>

                            <div className="mt-6 rounded-lg bg-red-600 py-2.5 text-sm text-center font-semibold text-white transition group-hover:bg-red-700">
                                Watch Playlist ↗
                            </div>

                        </a>

                        {/* Practice Questions */}

                        <a
                            href={selectedTopic.resources.practice}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-green-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-green-500 hover:shadow-xl hover:shadow-green-500/10"
                        >

                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-green-500/10 text-5xl">
                                💻
                            </div>

                            <h3 className="text-xl font-bold text-white">
                                Practice Questions
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Solve curated coding questions and strengthen your problem-solving skills.
                            </p>

                            <div className="mt-6 rounded-lg bg-green-600 py-2.5 text-sm text-center font-semibold text-white transition group-hover:bg-green-700">
                                Start Practice ↗
                            </div>

                        </a>

                        {/* Visualizer */}

                        <a
                            href={selectedTopic.resources.visualizer}
                            target="_blank"
                            rel="noreferrer"
                            className="group rounded-2xl border border-purple-800 bg-slate-950 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500 hover:shadow-xl hover:shadow-purple-500/10"
                        >

                            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xll bg-purple-500/10 text-5xl">
                                🌐
                            </div>

                            <h3 className="text-xl font-bold text-white">
                                Visualizer
                            </h3>

                            <p className="mt-3 text-sm leading-6 text-slate-400">
                                Understand concepts visually with interactive animations and simulations.
                            </p>

                            <div className="mt-6 rounded-lg bg-purple-600 py-2.5 text-sm text-center font-semibold text-white transition group-hover:bg-purple-700">
                                Open Visualizer ↗
                            </div>

                        </a>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Notes;