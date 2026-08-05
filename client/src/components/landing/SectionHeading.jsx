function SectionHeading({ badge, title, subtitle }) {
    return (
        <div className="mx-auto max-w-3xl text-center">

            <span className="inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-400">
                {badge}
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl lg:text-4xl">
                {title}
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                {subtitle}
            </p>

        </div>
    );
}

export default SectionHeading;