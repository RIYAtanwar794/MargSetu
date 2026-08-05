import SectionHeading from "../../../components/landing/SectionHeading";
import FAQItem from "../../../components/landing/FAQItem";

const faqs = [
    {
        question: "Is MargSetu free to use?",
        answer:
            "Yes. MargSetu offers a free version that helps you organize your coding interview preparation. Additional premium features can be added in future versions.",
    },
    {
        question: "Does MargSetu track my progress?",
        answer:
            "Yes. Your solved problems, revision history, learning streaks, and overall progress are tracked automatically.",
    },
    {
        question: "Can I prepare for specific companies?",
        answer:
            "Yes. MargSetu provides company-focused roadmaps and resources for your target companies.",
    },
    {
        question: "Will my study data be saved?",
        answer:
            "Yes. Your notes, bookmarks, roadmap progress, and revision plans are securely stored with your account.",
    },
    {
        question: "Can I use MargSetu on my phone?",
        answer:
            "Yes. MargSetu is fully responsive and works smoothly on desktops, tablets, and mobile devices.",
    },
];





function FAQ() {
    return (
        <section id="faq" className="bg-slate-950 px-5 sm:px-6 py-20">

            <div className="mx-auto max-w-4xl">

                <SectionHeading
                    badge="❓ Frequently Asked Questions"
                    title="Have Questions? We've Got Answers."
                    subtitle="Everything you need to know before starting your interview preparation journey with MargSetu"
                />

                <div className="mt-16 space-y-4 sm:space-y-5">

                    {faqs.map((faq, index) => (
                        <FAQItem
                            key={index}
                            question={faq.question}
                            answer={faq.answer}
                        />
                    ))}

                </div>

            </div>

        </section>
    );
}

export default FAQ;