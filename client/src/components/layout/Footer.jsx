import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";

function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950 px-6 py-12">

            <div className="mx-auto flex max-w-7xl flex-col gap-10 md:flex-row md:items-center md:justify-between">

                <div>

                    <h2 className="text-2xl font-bold text-white">
                        MargSetu
                    </h2>

                    <p className="mt-3 max-w-md text-sm leading-7 text-slate-400 sm:text-base">
                        Your all-in-one platform for smarter coding interview
                        preparation, AI-powered learning, structured roadmaps,
                        and consistent progress.
                    </p>

                </div>

                <div className="flex flex-wrap justify-center gap-6 text-slate-400 md:justify-start">

                    <a href="#" className="hover:text-blue-400 transition">
                        Features
                    </a>

                    <a href="#" className="hover:text-blue-400 transition">
                        FAQ
                    </a>

                    <a href="#" className="hover:text-blue-400 transition">
                        Contact
                    </a>

                </div>

                <div className="flex justify-center gap-5 md:justify-end">

                    <a
                        href="#"
                        className="rounded-xl border border-slate-800 p-3 text-slate-400 transition hover:border-blue-500 hover:text-white"
                    >
                        <FaGithub size={20} />
                    </a>

                    <a
                        href="#"
                        className="rounded-xl border border-slate-800 p-3 text-slate-400 transition hover:border-blue-500 hover:text-white"
                    >
                        <FaLinkedin size={20} />
                    </a>

                    <a
                        href="#"
                        className="rounded-xl border border-slate-800 p-3 text-slate-400 transition hover:border-blue-500 hover:text-white"
                    >
                        <Mail size={20} />
                    </a>

                </div>

            </div>

            <div className="mt-10 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
                © 2026 MargSetu.  All rights reserved.
            </div>

        </footer>
    );
}

export default Footer;