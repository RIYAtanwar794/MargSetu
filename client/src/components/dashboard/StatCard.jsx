function StatCard({ icon, title, value, subtitle }) {
    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/10">
            <div className="flex items-center justify-between">
                <div>

                    <p className="text-sm text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold text-white">
                        {value}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                        {subtitle}
                    </p>

                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600/15 text-2xl">
                    {icon}
                </div>

            </div>

        </div>
    );
}

export default StatCard;