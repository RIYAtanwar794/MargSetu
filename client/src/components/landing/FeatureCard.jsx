import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function FeatureCard({
    icon,
    title,
    description,
    children,
    reverse = false,
    buttonText = "Learn More",
}) {


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
        <div
            className={`
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-12
                md:gap-16
                lg:gap-24
                items-center
            `}
        >
            {/* Preview */}

            <div
                className={`
                   flex justify-center items-center
                   ${reverse ? "lg:order-2" : ""}
                `}
            >
                {children}
            </div>

            {/* Content */}

            <div
                className={`
                    mx-auto max-w-xl text-center 
                    lg:mx-0 lg:text-left
                    ${reverse ? "lg:order-1 lg:pl-8" : ""}
                `}
            >
                <div className="mb-6 mx-auto lg:mx-0 inline-flex rounded-2xl bg-blue-500/10 p-4 text-blue-400">
                    {icon}
                </div>

                <h3 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                    {title}
                </h3>

                <p className="mt-6 text-base leading-7 sm:text-lg sm:leading-8 text-slate-400">
                    {description}
                </p>

                <button
                    onClick={handleCTA}
                    className="group mt-8 inline-flex items-center gap-2 text-blue-400 transition-all duration-300 hover:gap-3 hover:text-blue-300"
                >
                    {buttonText}

                    <ArrowRight
                        size={18}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                </button>
                
            </div>
        </div>
    );
}

export default FeatureCard;