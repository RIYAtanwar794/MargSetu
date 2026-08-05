import SectionHeading from "../../../components/landing/SectionHeading";
import FeatureTile from "../../../components/landing/FeatureTile";
import { motion } from "framer-motion";

import {
    Bot,
    CalendarClock,
    Route,
    ChartColumn,
    BookOpen,
    NotebookPen,
    BriefcaseBusiness,
    CheckCircle2,
    Target,
} from "lucide-react";

function Everything() {
    return (
        <section id="workspace" className="bg-slate-950 px-5 py-20 sm:px-6 lg:py-18">

            <div className="mx-auto max-w-7xl">

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                >

                    <SectionHeading
                        badge="🚀 Inside MargSetu"
                        title="Your Interview Prep Workspace"
                        subtitle="Everything from AI guidance and structured roadmaps to revision planning, problem tracking, analytics, and curated resources—organized in one place so you can focus on preparing, not managing."
                    />

                </motion.div>

                <motion.div
                    className="mt-20 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                        duration: 0.7,
                        staggerChildren: 0.1,
                    }}
                >

                    <FeatureTile
                        icon={<Bot size={28} />}
                        title="AI Mentor"
                        description="Get instant guidance whenever you're stuck."
                    />

                    <FeatureTile
                        icon={<CalendarClock size={28} />}
                        title="Revision Planner"
                        description="Know exactly what to revise every day."
                    />

                    <FeatureTile
                        icon={<Route size={28} />}
                        title="Roadmaps"
                        description="Company-wise preparation paths."
                    />

                    <FeatureTile
                        icon={<ChartColumn size={28} />}
                        title="Analytics"
                        description="Track consistency and learning progress."
                    />

                    <FeatureTile
                        icon={<BookOpen size={28} />}
                        title="Resources"
                        description="Curated interview preparation material."
                    />

                    <FeatureTile
                        icon={<NotebookPen size={28} />}
                        title="Notes"
                        description="Save concepts for quick revision."
                    />

                    <FeatureTile
                        icon={<CheckCircle2 size={28} />}
                        title="Problem Tracker"
                        description="Keep track of solved, bookmarked and pending coding problems."
                    />

                    <FeatureTile
                        icon={<BriefcaseBusiness size={28} />}
                        title="Company Tracker"
                        description="Organize your target companies."
                    />

                </motion.div>

            </div>

        </section>
    );
}

export default Everything;