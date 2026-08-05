import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({
    label,
    placeholder,
    value,
    onChange,
    name,
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <div className="relative">

                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required={required}
                    className="
                        w-full
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-800
                        px-4
                        py-4
                        pr-12
                        text-white
                        placeholder:text-slate-500
                        outline-none
                        transition-all
                        duration-300
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-500/20
                    "
                />

                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-blue-400"
                >
                    {showPassword ? (
                        <EyeOff size={20} />
                    ) : (
                        <Eye size={20} />
                    )}
                </button>

            </div>
        </div>
    );
}

export default PasswordInput;