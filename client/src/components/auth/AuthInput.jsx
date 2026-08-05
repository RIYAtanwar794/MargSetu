function AuthInput({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    name,
    required = false,
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-300">
                {label}
            </label>

            <input
                type={type}
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
        </div>
    );
}

export default AuthInput;