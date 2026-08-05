import HeroButtons from "../../../components/landing/HeroButtons";
import ProductPreview from "../../../components/landing/ProductPreview";
import { motion } from "framer-motion";

function Hero() {
    return (
        <section id="home" className="relative overflow-hidden bg-slate-950">

            <div className="absolute left-[-120px] top-32 h-60 w-60 rounded-full bg-blue-600/20 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]"></div>

            <div className="absolute right-[-100px] top-16 h-60 w-60 rounded-full bg-purple-600/20 blur-[100px] sm:h-80 sm:w-80 sm:blur-[120px]"></div>

            <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 pt-12 pb-12 sm:pt-16 lg:min-h-[90vh] lg:flex-row">
                {/* LEFT */}

                <motion.div
                    className="flex w-full flex-col items-center text-center lg:w-1/2 lg:items-start lg:text-left"
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeOut",
                    }}
                >

                    <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-5 py-2 text-sm font-medium text-blue-400 sm:text-sm">
                        🚀 Built for Aspiring Software Engineers
                    </span>

                    <h1 className="mt-8 text-3xl font-extrabold leading-tight text-white sm:text-5xl lg:text-5xl">
                        Everything You Need
                        <br />
                        to Ace Your
                        <br />
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Coding Interviews.
                        </span>
                    </h1>

                    <p className="mt-6 max-w-lg text-base leading-7 text-slate-400 sm:text-lg sm:leading-8">
                        Prepare DSA with AI-guided roadmaps, personalized revision cycles,
                        interview resources, progress insights, and smart study planning—
                        all designed to help you prepare confidently for software engineering interviews.
                    </p>

                    <HeroButtons />

                    <div className="mt-10 flex flex-wrap justify-center gap-3 lg:justify-start">

                        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                            🤖 AI Mentor
                        </span>

                        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                            📅 Smart Revision Planner
                        </span>

                        <span className="rounded-full bg-slate-800 px-4 py-2 text-sm text-slate-300">
                            📈 Progress Insights
                        </span>

                    </div>

                </motion.div>

                {/* RIGHT */}

                <motion.div
                    className="mt-8 flex w-full justify-center lg:mt-0 lg:w-1/2 lg:justify-end"
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                        duration: 0.8,
                        delay: 0.2,
                        ease: "easeOut",
                    }}
                >

                    <ProductPreview />

                </motion.div>

            </div>
        </section >
    );
}

export default Hero;