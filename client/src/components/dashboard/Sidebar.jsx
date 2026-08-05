import {
    LayoutDashboard,
    Route,
    BookOpen,
    CalendarClock,
    NotebookPen,
    FolderOpen,
    Bot,
    ChartColumn,
    User,
    LogOut,
    X,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import SidebarItem from "./SidebarItem";
import logo from "../../assets/margsetu-logo.png";
import { useNavigate } from "react-router-dom";


function Sidebar({ sidebarOpen, setSidebarOpen }) {

    const navigate = useNavigate();
    const { logout } = useAuth();

    return (

        <>

            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-40 bg-black/50 lg:hidden"
                />
            )}

            <aside
                className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300
                ${sidebarOpen
                        ? "translate-x-0"
                        : "-translate-x-full"
                    }
            lg:static lg:translate-x-0`}
            >

                <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">

                    <div
                        onClick={() => navigate("/")}
                        className="flex flex-1 items-center justify-center ml-2 h-16 w-auto cursor-pointer"
                    >

                        <img
                            src={logo}
                            alt="PrepPilot AI"
                            className="h-18 w-auto object-contain transition-all duration-300 hover:scale-105"
                        />

                    </div>

                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white lg:hidden"
                    >
                        <X size={22} />
                    </button>

                </div>


                {/* Navigation */}

                <div className="flex-1 overflow-y-auto px-5 py-8">

                    <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Main
                    </p>

                    <div className="space-y-2">

                        <SidebarItem
                            to="/dashboard"
                            icon={<LayoutDashboard size={20} />}
                            label="Dashboard"
                        />

                        <SidebarItem
                            to="/dashboard/roadmaps"
                            icon={<Route size={20} />}
                            label="Roadmaps"
                        />

                        <SidebarItem
                            to="/dashboard/problems"
                            icon={<BookOpen size={20} />}
                            label="Problem Tracker"
                        />

                        <SidebarItem
                            to="/dashboard/revision"
                            icon={<CalendarClock size={20} />}
                            label="Revision"
                        />

                        <SidebarItem
                            to="/dashboard/notes"
                            icon={<NotebookPen size={20} />}
                            label="Notes"
                        />

                        <SidebarItem
                            to="/dashboard/resources"
                            icon={<FolderOpen size={20} />}
                            label="Resources"
                        />

                    </div>

                    <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        AI
                    </p>

                    <SidebarItem
                        to="/dashboard/mentor"
                        icon={<Bot size={20} />}
                        label="AI Mentor"
                    />

                    <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Progress
                    </p>

                    <SidebarItem
                        to="/dashboard/analytics"
                        icon={<ChartColumn size={20} />}
                        label="Analytics"
                    />

                    <p className="mb-4 mt-10 text-xs font-semibold uppercase tracking-widest text-slate-500">
                        Account
                    </p>

                    <SidebarItem
                        to="/dashboard/profile"
                        icon={<User size={20} />}
                        label="Profile"
                    />

                </div>


                {/* Logout */}

                <div className="border-t border-slate-800 p-5">

                    <button
                        onClick={logout}
                        className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-slate-400 transition hover:bg-red-600 hover:text-white"
                    >
                        <LogOut size={20} />

                        Logout

                    </button>

                </div>

            </aside>

        </>

    );
}

export default Sidebar;