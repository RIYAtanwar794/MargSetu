import Navbar from "../../components/layout/Navbar";
import Hero from "./sections/Hero";
import Features from "./sections/Features";
import Everything from "./sections/Everything";
import HowItWorks from "./sections/HowItWorks";
import FAQ from "./sections/FAQ";
import CTA from "./sections/CTA";
import Footer from "../../components/layout/Footer";

function Landing() {
    return (
        <div className="bg-slate-950">
            <Navbar />
            <Hero />
            <Features />
            <Everything />
            <HowItWorks />
            <FAQ />
            <CTA />
            <Footer />
        </div>
    );
}

export default Landing;