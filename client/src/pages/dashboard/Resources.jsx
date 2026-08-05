import { useState } from "react";
import { resources } from "../../data/resources";
import { ExternalLink } from "lucide-react";

function Resources() {

    const [search, setSearch] = useState("");

    const filteredSections = resources
        .map((section) => ({
            ...section,
            items: section.items.filter((resource) =>
                resource.title.toLowerCase().includes(search.toLowerCase())
            ),
        }))
        .filter((section) => section.items.length > 0);


    return (
        <div className="space-y-10">

            <div>
                <h1 className="text-4xl font-bold text-white">
                    Learning Resources
                </h1>

                <div className="mt-8">
                    <input
                        type="text"
                        placeholder="Search resources..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white outline-none transition focus:border-blue-500"
                    />
                </div>

                <p className="mt-3 text-slate-400">
                    Curated resources to help you master DSA, Web Development and crack
                    top tech interviews.
                </p>
            </div>

            {filteredSections.length === 0 ? (

                <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 py-20">

                    <div className="text-6xl">
                        🔍
                    </div>

                    <h2 className="mt-6 text-2xl font-bold text-white">
                        No Resources Found
                    </h2>

                    <p className="mt-3 text-slate-400">
                        Try searching with another keyword.
                    </p>

                </div>

            ) : (

                filteredSections.map((section) => (

                    <div key={section.category}>

                        <h2 className="mb-6 text-2xl font-bold text-white">
                            {section.category}
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {section.items.map((resource) => (

                                <div
                                    key={resource.title}
                                    className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10"
                                >
                                    <h3 className="text-xl font-semibold text-white">
                                        {resource.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-400">
                                        {resource.description}
                                    </p>

                                    <a
                                        href={resource.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                                    >
                                        Open Resource
                                        <ExternalLink size={16} />
                                    </a>

                                </div>

                            ))}

                        </div>

                    </div>

                ))

            )}
        </div>
    );
}

export default Resources;