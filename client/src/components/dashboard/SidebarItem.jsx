import { NavLink } from "react-router-dom";

function SidebarItem({ to, icon, label }) {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`
            }
        >
            {icon}

            <span className="font-medium">
                {label}
            </span>
        </NavLink>
    );
}

export default SidebarItem;