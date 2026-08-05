import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CTA() {

    const navigate = useNavigate();

    const handleGetStarted = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    const handleExploreFeatures = () => {
        document
            .getElementById("features")
            ?.scrollIntoView({ behavior: "smooth" });
    };


    return (
        <section id="cta" className="bg-slate-950 px-5 py-20 sm:px-6 lg:py-24">

            <div className="mx-auto max-w-6xl overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-blue-600/10 via-slate-900 to-purple-600/10 p-8 sm:p-10 lg:p-12 text-center">

                <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400">
                    🚀 Start Your Journey
                </span>

                <h2 className="mt-8 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl font-bold text-white">
                    Ready to Crack Your
                    <br />
                    Dream Tech Interview?
                </h2>

                <p className="mx-auto mt-6 max-w-2xl text-base leading-7 sm:text-lg sm:leading-8 text-slate-400">
                    Join Margsetu and prepare with personalized roadmaps,
                    AI-powered guidance, smart revision planning, and powerful
                    progress tracking—all in one place.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:flex-row">

                    <button
                        onClick={handleGetStarted}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-blue-500"
                    >
                        Get Started Free
                        <ArrowRight size={20} />
                    </button>

                    <button
                        onClick={handleExploreFeatures}
                        className="rounded-xl border border-slate-700 px-8 py-4 font-semibold text-slate-300 transition hover:border-blue-500 hover:text-white"
                    >
                        Explore Features
                    </button>

                </div>

            </div>

        </section>
    );
}

export default CTA;