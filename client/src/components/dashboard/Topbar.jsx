import { Bell, Search, Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function Topbar({ setSidebarOpen }) {

    const { user } = useAuth();

    return (

        <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

            <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4 rounded-xl border border-slate-800 bg-slate-900 p-3 text-slate-300 transition hover:bg-slate-800 lg:hidden "
            >
                <Menu size={22} />
            </button>

            <div className="hidden md:flex flex-1 justify-center">
                <div className="rounded-full border border-blue-500/30 bg-gradient-to-r from-blue-500/10 to-violet-500/10 px-6 py-2 shadow-lg shadow-blue-500/10 transition-all duration-300 hover:scale-105 hover:border-blue-400">

                    <p className="text-sm font-medium tracking-wide text-blue-300">
                        🏆 Stay consistent—Great engineers aren't built overnight.
                    </p>

                </div>
            </div>

            <div className="flex items-center gap-5 ml-auto">
                <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white transition-all duration-300 hover:scale-105">

                        {user?.name?.charAt(0).toUpperCase()}

                    </div>

                    <div className="hidden md:block transition-all duration-300 hover:scale-105">

                        <p className="font-semibold text-white">

                            {user?.name}

                        </p>

                        <p className="text-sm text-slate-400">

                            {user?.email}

                        </p>

                    </div>
                </div>
            </div>

        </header>

    );
}

export default Topbar;