function AuthLayout({ children, branding }) {
    return (
        <div className="relative min-h-screen overflow-hidden bg-slate-950">

            <div className="absolute left-[-150px] top-20 h-96 w-96 rounded-full bg-blue-600/20 blur-[140px]" />
            <div className="absolute right-[-150px] bottom-0 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-12">


                {/* Left Side */}
                <div className="hidden w-1/2 lg:flex">
                    {branding}
                </div>


                {/* Right Side */}
                <div className="flex w-full justify-center lg:w-1/2">
                    {children}
                </div>

            </div>

        </div>
    );
}

export default AuthLayout;