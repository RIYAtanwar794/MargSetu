import { useNavigate } from "react-router-dom";

function HeroButtons() {

    const navigate = useNavigate();

    const handleCTA = () => {
        const token = localStorage.getItem("token");

        if (token) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }

    };


    return (
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <button
                onClick={handleCTA}
                className="
        rounded-xl
        bg-blue-600
        px-7
        py-4
        font-semibold
        text-white
        transition-all
        duration-300
        hover:-translate-y-1
        hover:bg-blue-700
        hover:shadow-lg
        hover:shadow-blue-500/30
    "
            >
                Start Preparing Free →
            </button>

            <button
                onClick={() => {
                    document
                        .getElementById("features")
                        ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="
        rounded-xl
        border
        border-slate-700
        px-7
        py-4
        font-semibold
        text-slate-300
        transition-all
        duration-300
        hover:border-blue-500
        hover:text-white
    "
            >
                See How It Works
            </button>

        </div>
    );
}

export default HeroButtons;