import { useEffect, useState } from "react";
import { getProblems } from "../../services/problemService";
import { roadmapProblems } from "../../data/problems";
import RoadmapCard from "../../components/roadmaps/RoadmapCard";
import { roadmaps } from "../../data/roadmaps";

function Roadmaps() {

    const [companyProgress, setCompanyProgress] = useState({});

    const bigTech = roadmaps.filter((company) =>
        ["Google SDE", "Amazon SDE", "Microsoft SDE", "Meta SDE", "Apple SDE", "Netflix SDE"].includes(company.title)
    );

    const productCompanies = roadmaps.filter((company) =>
        ["Adobe SDE", "Atlassian SDE", "Uber SDE", "Oracle SDE", "Salesforce SDE", "Intuit SDE", "Walmart Global Tech"].includes(company.title)
    );

    const financeCompanies = roadmaps.filter((company) =>
        ["Goldman Sachs", "JPMorgan Chase"].includes(company.title)
    );


    const fetchProgress = async () => {

        try {

            const res = await getProblems();

            const solvedProblems = res.data.problems;

            const progressData = {};

            roadmaps.forEach((company) => {

                let solved = 0;

                (company.roadmap || []).forEach((topic) => {
                    solved += solvedProblems.filter(
                        (problem) =>
                            problem.topic?.trim().toLowerCase() ===
                            topic.trim().toLowerCase()
                    ).length;
                });

                let total = 0;

                (company.roadmap || []).forEach((topic) => {

                    const key = topic
                        .toLowerCase()
                        .replace(/\s+/g, "-");

                    total += roadmapProblems[key]?.length || 0;

                });

                progressData[company.title] = {
                    solved,
                    total,
                };

            });

            console.log(progressData);

            setCompanyProgress(progressData);

        } catch (err) {

            console.error(err);

        }

    };


    useEffect(() => {

        fetchProgress();

    }, []);


    return (
        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold text-white">
                    Roadmaps
                </h1>

                <p className="mt-3 text-slate-400">
                    Follow structured interview preparation roadmaps for top companies.
                </p>

                <div className="mt-10 space-y-12">

                    {/* Big Tech */}

                    <div>

                        <h2 className="mb-6 text-2xl font-bold text-white">
                            🚀 Big Tech
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {bigTech.map((roadmap) => (
                                <RoadmapCard
                                    key={roadmap.title}
                                    {...roadmap}
                                    progress={companyProgress[roadmap.title]?.solved || 0}
                                    totalProblems={companyProgress[roadmap.title]?.total || 0}
                                    percentage={
                                        companyProgress[roadmap.title]?.total
                                            ? Math.round(
                                                (companyProgress[roadmap.title].solved /
                                                    companyProgress[roadmap.title].total) *
                                                100
                                            )
                                            : 0
                                    }
                                />
                            ))}

                        </div>

                    </div>

                    {/* Product Companies */}

                    <div>

                        <h2 className="mb-6 text-2xl font-bold text-white">
                            💻 Product Companies
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {productCompanies.map((roadmap) => (
                                <RoadmapCard
                                    key={roadmap.title}
                                    {...roadmap}
                                    progress={companyProgress[roadmap.title]?.solved || 0}
                                    totalProblems={companyProgress[roadmap.title]?.total || 0}
                                    percentage={
                                        companyProgress[roadmap.title]?.total
                                            ? Math.round(
                                                (companyProgress[roadmap.title].solved /
                                                    companyProgress[roadmap.title].total) *
                                                100
                                            )
                                            : 0
                                    }
                                />
                            ))}

                        </div>

                    </div>

                    {/* Finance */}

                    <div>

                        <h2 className="mb-6 text-2xl font-bold text-white">
                            💰 Finance
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                            {financeCompanies.map((roadmap) => (
                                <RoadmapCard
                                    key={roadmap.title}
                                    {...roadmap}
                                    progress={companyProgress[roadmap.title]?.solved || 0}
                                    totalProblems={companyProgress[roadmap.title]?.total || 0}
                                    percentage={
                                        companyProgress[roadmap.title]?.total
                                            ? Math.round(
                                                (companyProgress[roadmap.title].solved /
                                                    companyProgress[roadmap.title].total) *
                                                100
                                            )
                                            : 0
                                    }
                                />
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Roadmaps;