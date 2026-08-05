import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthBranding from "../../components/auth/AuthBranding";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";

import { loginUser } from "../../services/authService";

function Login() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            setLoading(true);

            const data = await loginUser(formData);

            login(data.token, data.user);

            navigate("/");

        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout branding={<AuthBranding />}>

            <AuthCard
                title="Welcome Back"
                subtitle="Login to continue your interview preparation."
                footer={
                    <p className="text-slate-400">
                        Don't have an account?

                        <Link
                            to="/register"
                            className="ml-2 font-medium text-blue-400 hover:text-blue-300"
                        >
                            Register
                        </Link>
                    </p>
                }
            >

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <AuthInput
                        label="Email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />

                    <PasswordInput
                        label="Password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                    />

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-3 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Logging In..." : "Login"}
                    </button>

                </form>

            </AuthCard>

        </AuthLayout>
    );
}

export default Login;