import { useState } from "react";
import { ChevronDown } from "lucide-react";

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 transition-all duration-300 hover:border-blue-500/40">
            <button
                onClick={() => setOpen(!open)}
                className="flex w-full items-center justify-between p-6 text-left"
            >
                <h3 className="pr-4 text-base font-semibold text-white sm:text-lg">
                    {question}
                </h3>

                <ChevronDown
                    className={`transition-transform duration-300 ${open ? "rotate-180 text-blue-400" : "text-slate-400"
                        }`}
                />
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40" : "max-h-0"
                    }`}
            >
                <p className="px-6 pb-6 text-sm leading-7 text-slate-400 sm:text-base">
                    {answer}
                </p>
            </div>

        </div>
    );
}

export default FAQItem;