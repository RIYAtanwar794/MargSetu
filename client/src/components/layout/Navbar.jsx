import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/margsetu-logo.png";


function Navbar() {

    const [isOpen, setIsOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuth();
    const navigate = useNavigate();


    return (
        <nav className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
            <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-6 lg:h-20">
                {/* Logo */}
                <div className="flex items-center">
                    <img
                        src={logo}
                        alt="PrepPilot AI"
                        className="h-16 w-auto object-contain transition duration-300 hover:scale-105"
                    />
                </div>

                {/* Navigation Links */}

                <div className="hidden items-center gap-10 text-slate-300 lg:flex">

                    <a href="#features">Features</a>
                    <a href="#workspace">Workspace</a>
                    <a href="#how-it-works">How It Works</a>
                    <a href="#faq">FAQ</a>
                </div>

                {/* Buttons */}

                <div className="hidden items-center gap-4 lg:flex">

                    {isAuthenticated ? (
                        <>
                            <span className="text-slate-300">
                                Hi, {user?.name}
                            </span>

                            <button
                                onClick={() => navigate("/dashboard")}
                                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                Dashboard
                            </button>

                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                                className="font-medium text-slate-300 transition hover:text-white"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="font-medium text-slate-300 transition hover:text-white"
                            >
                                Login
                            </Link>

                            <Link
                                to="/register"
                                className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
                            >
                                Get Started
                            </Link>
                        </>
                    )}

                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-lg p-2 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

            </div>


            {
                isOpen && (
                    <div className="lg:hidden border-t border-slate-800 bg-slate-950">

                        <div className="flex flex-col px-6 py-6">

                            <a
                                href="#"
                                className="py-3 text-slate-300 hover:text-white"
                            >
                                Features
                            </a>

                            <a
                                href="#"
                                className="py-3 text-slate-300 hover:text-white"
                            >
                                Roadmap
                            </a>

                            <a
                                href="#"
                                className="py-3 text-slate-300 hover:text-white"
                            >
                                Resources
                            </a>

                            {isAuthenticated ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsOpen(false);
                                            navigate("/dashboard");
                                        }}
                                        className="mt-5 text-left text-slate-300 hover:text-white"
                                    >
                                        Dashboard
                                    </button>

                                    <button
                                        onClick={() => {
                                            logout();
                                            setIsOpen(false);
                                            navigate("/");
                                        }}
                                        className="mt-4 rounded-xl bg-red-600 py-3 font-medium text-white hover:bg-red-500"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-5 text-left text-slate-300 hover:text-white"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        className="mt-4 rounded-xl bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )}

                        </div>

                    </div>
                )
            }
        </nav>
    );
}

export default Navbar;