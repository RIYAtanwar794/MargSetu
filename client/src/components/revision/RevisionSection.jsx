import RevisionCard from "./RevisionCard";

function RevisionSection({
    title,
    color,
    emptyMessage,
    problems,
    handleRevise,
}) {
    return (
        <div>

            <h2 className={`mb-4 text-2xl font-bold ${color === "red"
                    ? "text-red-400"
                    : color === "yellow"
                        ? "text-yellow-400"
                        : "text-green-400"
                }`}>
                {title}
            </h2>

            {problems.length === 0 ? (

                <p className="text-slate-400">
                    {emptyMessage}
                </p>

            ) : (

                <div className="space-y-4">

                    {problems.map((problem) => (

                        <RevisionCard
                            key={problem._id}
                            problem={problem}
                            color={color}
                            handleRevise={handleRevise}
                        />

                    ))}

                </div>

            )}

        </div>
    );
}

export default RevisionSection;