import SectionHeading from "../../../components/landing/SectionHeading";
import FeatureCard from "../../../components/landing/FeatureCard";
import RevisionPreview from "../../../components/landing/RevisionPreview";
import { motion } from "framer-motion";

import {
    Bot,
    CalendarClock,
    BrainCircuit,
} from "lucide-react";


function AIChatPreview() {
    return (
        <div className="w-full max-w-sm rounded-3xl border border-slate-700 bg-slate-900 p-5 shadow-2xl sm:max-w-md sm:p-6">
            <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20">
                    <Bot className="text-blue-400" size={20} />
                </div>

                <div>

                    <h4 className="font-semibold text-white">
                        AI Mentor
                    </h4>

                    <p className="text-sm text-slate-400">
                        Online
                    </p>

                </div>

            </div>

            <div className="mt-10 space-y-6">

                <div className="w-fit rounded-xl bg-slate-800 px-4 py-3 text-slate-300">

                    Which topic should I revise today?

                </div>

                <div className="ml-auto w-fit max-w-[220px] rounded-xl bg-blue-600 px-4 py-3 text-sm text-white sm:max-w-xs sm:text-base">

                    Revise Sliding Window first.
                    Then solve 3 medium problems.
                    You're ready for Trees after that.

                </div>

            </div>

        </div>
    );
}





function Features() {
    return (

        <section id="features" className="relative overflow-hidden bg-slate-950 px-5 py-20 sm:px-6 lg:py-24">

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)]"></div>

            <div className=" relative z-10 mx-auto max-w-7xl">

                <SectionHeading

                    badge="✨ Powerful Features"

                    title="Everything You Need
                        to Stay Interview Ready"

                    subtitle="Everything from AI-powered guidance to structured roadmaps and smart revision planning—designed to help you prepare consistently and confidently for coding interviews."

                />

                <div className="mt-16 space-y-20 sm:mt-20 lg:mt-24 lg:space-y-28">

                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >

                        <FeatureCard

                            icon={<Bot size={32} />}

                            title="AI Mentor"

                            description="Get personalized guidance based on your progress. Receive topic recommendations, revision suggestions, interview strategies, and instant explanations whenever you're stuck."

                            buttonText="Explore AI Mentor"
                        >

                            <AIChatPreview />

                        </FeatureCard>

                    </motion.div>


                    <motion.div
                        initial={{ opacity: 0, y: 70 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.7,
                            delay: 0.15,
                        }}
                    >

                        <FeatureCard
                            reverse
                            icon={<CalendarClock size={32} />}
                            title="Smart Revision Planner"
                            description="Never wonder what to study next. PrepPilot AI automatically creates personalized revision schedules using spaced repetition so you remember concepts longer and prepare more efficiently."
                            buttonText="Explore Planner"
                        >
                            <RevisionPreview />
                        </FeatureCard>

                    </motion.div>

                </div>

            </div>

        </section >

    );
}

export default Features;