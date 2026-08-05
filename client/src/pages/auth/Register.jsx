import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import AuthLayout from "../../components/auth/AuthLayout";
import AuthBranding from "../../components/auth/AuthBranding";
import AuthCard from "../../components/auth/AuthCard";
import AuthInput from "../../components/auth/AuthInput";
import PasswordInput from "../../components/auth/PasswordInput";

import { registerUser } from "../../services/authService";

function Register() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
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

        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match");
        }

        try {
            setLoading(true);

            const data = await registerUser({
                name: formData.name,
                email: formData.email,
                password: formData.password,
            });

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
                title="Create Account"
                subtitle="Start your interview preparation journey today."
                footer={
                    <p className="text-slate-400">
                        Already have an account?

                        <Link
                            to="/login"
                            className="ml-2 font-medium text-blue-400 hover:text-blue-300"
                        >
                            Login
                        </Link>
                    </p>
                }
            >

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <AuthInput
                        label="Full Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />

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
                        placeholder="Create a strong password"
                        required
                    />

                    <PasswordInput
                        label="Confirm Password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                    />

                    <div className="flex items-start gap-3">

                        <input
                            type="checkbox"
                            required
                            className="mt-1 h-4 w-4 accent-blue-600"
                        />

                        <p className="text-sm leading-6 text-slate-400">
                            I agree to the
                            <span className="ml-1 text-blue-400">
                                Terms & Conditions
                            </span>
                        </p>

                    </div>

                    {error && (
                        <p className="text-sm text-red-400">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full rounded-xl bg-blue-600 py-4 font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? "Creating Account..." : "Create Account"}
                    </button>

                </form>

            </AuthCard>

        </AuthLayout>
    );
}

export default Register;