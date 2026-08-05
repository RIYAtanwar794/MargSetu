function AuthCard({ title, subtitle, children, footer }) {
    return (
        <div className="w-full max-w-lg rounded-3xl border border-slate-800 bg-slate-900/70 p-10 shadow-2xl backdrop-blur-xl">

            {/* Heading */}
            <div className="text-center">

                <h2 className="text-3xl font-bold text-white">
                    {title}
                </h2>

                <p className="mt-3 text-slate-400">
                    {subtitle}
                </p>

            </div>


            {/* Form */}
            <div className="mt-10">
                {children}
            </div>


            {/* Footer */}
            {footer && (
                <div className="mt-8 border-t border-slate-800 pt-6 text-center">
                    {footer}
                </div>
            )}

        </div>
    );
}

export default AuthCard;