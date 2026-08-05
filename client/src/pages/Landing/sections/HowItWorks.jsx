import SectionHeading from "../../../components/landing/SectionHeading";
import StepCard from "../../../components/landing/StepCard";

import {
    UserPlus,
    Target,
    Bot,
    BookOpenCheck,
    ChartNoAxesCombined,
} from "lucide-react";

function HowItWorks() {
    return (
        <section id="how-it-works" className="bg-gradient-to-b from-slate-950 to-slate-900/40 px-5 py-20 sm:px-6 lg:py-24">

            <div className="mx-auto max-w-7xl ">

                <SectionHeading
                    badge="⚡ How It Works"
                    title="Your Journey Starts Here"
                    subtitle="Getting started with MargSetu is simple. Follow these five steps and build a consistent interview preparation routine."
                />

                <div className="mt-16 grid gap-6 sm:mt-20 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">

                    <StepCard
                        number="1"
                        icon={<UserPlus size={34} />}
                        title="Create Account"
                        description="Sign up and set up your MargSetu profile in just a few clicks."
                    />

                    <StepCard
                        number="2"
                        icon={<Target size={34} />}
                        title="Choose Your Goal"
                        description="Select your target company or prepare for placements and internships."
                    />

                    <StepCard
                        highlight
                        number="3"
                        icon={<Bot size={34} />}
                        title="Get AI Guidance"
                        description="Your personal AI mentor provides guidance, motivation, and a smart revision strategy to keep you interview-ready."
                    />

                    <StepCard
                        number="4"
                        icon={<BookOpenCheck size={34} />}
                        title="Practice Daily"
                        description="Solve problems, revise topics, save notes, and stay consistent every day."
                    />

                    <StepCard
                        number="5"
                        icon={<ChartNoAxesCombined size={34} />}
                        title="Track Progress"
                        description="Monitor your growth through analytics and keep improving every week."
                    />

                </div>

            </div>

        </section>
    );
}

export default HowItWorks;