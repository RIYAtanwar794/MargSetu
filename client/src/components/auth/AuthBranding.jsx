import {
    Bot,
    Route,
    CalendarClock,
    ChartColumn,
    CheckCircle2,
} from "lucide-react";

function Feature({ icon, text }) {
    return (
        <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 px-5 py-4 backdrop-blur-sm">

            <div className="text-blue-400">
                {icon}
            </div>

            <span className="text-slate-300">
                {text}
            </span>

        </div>
    );
}

function AuthBranding() {
    return (
        <div className="flex max-w-lg flex-col">

            {/* Heading */}
            <h2 className="mt-3 text-5xl font-extrabold leading-tight text-white">
                Ace Your
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                    Coding Interviews
                </span>
                <br />
                Smarter.
            </h2>


            {/* Description */}
            <p className="mt-8 text-lg leading-8 text-slate-400">
                AI-powered interview preparation platform that helps you
                stay consistent with smart roadmaps, personalized revision,
                analytics, and guided learning.
            </p>


            {/* Features */}
            <div className="mt-12 space-y-4">
                <Feature
                    icon={<Bot size={22} />}
                    text="AI Mentor for personalized guidance"
                />

                <Feature
                    icon={<Route size={22} />}
                    text="Company-wise learning roadmaps"
                />

                <Feature
                    icon={<CalendarClock size={22} />}
                    text="Smart revision planner"
                />

                <Feature
                    icon={<ChartColumn size={22} />}
                    text="Progress analytics & streak tracking"
                />

            </div>


            {/* Quote */}
            <div className="mt-10 rounded-3xl border border-blue-500/20 bg-blue-500/10 p-5">
                <CheckCircle2
                    className="text-blue-400"
                    size={28}
                />

                <p className="mt-4 text-lg leading-8 text-slate-300 italic">
                    "Success isn't about studying harder.
                    It's about studying smarter."
                </p>

            </div>

        </div>
    );
}

export default AuthBranding;