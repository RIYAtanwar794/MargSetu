import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-1 flex-col">

                <Topbar
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="flex-1 overflow-y-auto scrollbar-hide p-4 md:p-8">
                    <Outlet />
                </main>

            </div>

        </div>
    );
}

export default DashboardLayout;