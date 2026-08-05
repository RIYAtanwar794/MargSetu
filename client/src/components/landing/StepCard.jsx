function StepCard({
    number,
    icon,
    title,
    description,
    highlight = false,
}) {
    return (
        <div
            className={`
                group relative rounded-3xl border p-6 sm:p-8 transition-all duration-300
                hover:-translate-y-2 
                hover:shadow-[0_0_35px_rgba(59,130,246,0.12)]
                ${highlight
                    ? "border-blue-500/40 bg-gradient-to-br from-blue-500/10 to-slate-900"
                    : "border-slate-800 bg-slate-900/60 hover:border-blue-500/40"
                }
            `}
        >
            {/* Step Number */}

            <div className="absolute -top-5 left-6 sm:left-8 flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white shadow-lg">
                {number}
            </div>

            {/* Icon */}

            <div className="mt-6 mb-6 inline-flex rounded-2xl bg-blue-500/10 p-3 text-blue-400 transition-all duration-300 group-hover:scale-110">
                {icon}
            </div>

            {/* Title */}

            <h3 className="text-lg sm:text-xl font-bold text-white">
                {title}
            </h3>

            {/* Description */}

            <p className="mt-4 text-sm leading-7 text-slate-400 sm:text-base">
                {description}
            </p>
        </div>
    );
}

export default StepCard;