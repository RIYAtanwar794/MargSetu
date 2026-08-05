import { Bot, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Send, Trash2, Loader2 } from "lucide-react";
import { getMentorHistory, chatWithMentor, clearMentorHistory } from "../../services/mentorService";

function AIMentor() {

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {

        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });

    }, [messages]);


    useEffect(() => {
        loadHistory();
    }, []);

    const loadHistory = async () => {
        try {
            const data = await getMentorHistory();

            setMessages(data.messages || []);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSend = async () => {

        if (!input.trim()) return;

        const userMessage = {
            role: "user",
            content: input,
        };

        setMessages((prev) => [...prev, userMessage]);

        const question = input;

        setInput("");

        setLoading(true);

        try {

            const data = await chatWithMentor(question);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: data.reply,
                },
            ]);

        } catch (err) {

            console.error(err);

        } finally {

            setLoading(false);

        }
    };

    const handleClear = async () => {

        try {

            await clearMentorHistory();

            setMessages([]);

        } catch (err) {

            console.log(err);

        }

    };

    const quickPrompts = [
        "Generate a 30-day Google preparation roadmap.",
        "Explain Dynamic Programming from scratch.",
        "Take my mock interview.",
        "Create my revision strategy.",
        "Motivate me to study today.",
        "How should I prepare for Amazon interviews?"
    ];


    return (
        <div className="space-y-8">

            {/* Hero */}

            <div className="mt-2 relative overflow-hidden rounded-3xl border border-blue-900 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 p-6 sm:p-8 lg:px-12 lg:py-10">

                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl"></div>

                <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl"></div>

                <div className="relative">

                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 sm:h-20 sm:w-20">

                        <Bot size={40} className="text-white" />

                    </div>

                    <h2 className="text-lg font-semibold text-white">
                        AI Mentor
                    </h2>

                    <h1 className="mt-3 text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                        Your personal interview coach
                    </h1>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 lg:text-lg">
                        Powered by AI to help you crack coding interviews.
                        Ask doubts, generate study plans, prepare for top
                        companies, revise DSA, and receive personalized
                        guidance based on your progress.
                    </p>
                </div>

            </div>

            
            {/* Quick Actions */}

            <div>

                <div className="mb-6 flex items-center gap-3">

                    <Sparkles className="text-yellow-400" />

                    <h2 className="text-2xl sm:text-3xl font-bold text-white">

                        Quick Actions

                    </h2>

                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

                    {quickPrompts.map((action) => (

                        <button
                            key={action}
                            onClick={() => setInput(action)}
                            className="rounded-2xl border border-slate-800 bg-slate-900 p-5 sm:p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-blue-500 hover:bg-slate-800"
                        >

                            <h3 className="text-xl font-semibold text-white">

                                {action}

                            </h3>

                            <p className="mt-3 text-slate-400">

                                Click to instantly generate AI guidance.

                            </p>

                        </button>

                    ))}

                </div>

            </div>

            <div>

                <div className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-800 bg-slate-900">

                    {/* Chat Header */}

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 px-5 py-3">
                        <div>

                            <h2 className="text-lg font-semibold text-white">
                                AI Conversation
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Your personal interview mentor
                            </p>

                        </div>

                        <button
                            onClick={handleClear}
                            className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-1.5 text-sm font-medium text-red-400 transition hover:bg-red-500 hover:text-white"
                        >

                            Clear Chat

                        </button>

                    </div>

                    {/* Messages */}

                    <div className="h-[320px] sm:h-[320px]  overflow-y-auto space-y-6 p-6">

                        {messages.map((msg, index) => (

                            <div
                                key={index}
                                className={`flex ${msg.role === "user"
                                    ? "justify-end"
                                    : "gap-4"
                                    }`}
                            >

                                {msg.role === "assistant" && (

                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl">

                                        🤖

                                    </div>

                                )}

                                <div
                                    className={`max-w-[90%] sm:max-w-[80%] rounded-2xl p-5 ${msg.role === "user"
                                        ? "bg-blue-600 text-white"
                                        : "bg-slate-800 text-slate-300"
                                        }`}
                                >

                                    {msg.role === "assistant" && (

                                        <h3 className="mb-2 font-semibold text-blue-400">

                                            PrepPilot AI

                                        </h3>

                                    )}

                                    <p className="whitespace-pre-wrap leading-7">

                                        {msg.content}

                                    </p>

                                </div>

                            </div>

                        ))}

                        {loading && (

                            <div className="flex gap-4">

                                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-blue-600">

                                    🤖

                                </div>

                                <div className="rounded-2xl bg-slate-800 px-5 py-4 text-slate-300">

                                    <Loader2 className="animate-spin" />

                                </div>

                            </div>

                        )}

                        <div ref={bottomRef}></div>

                    </div>

                    {/* Input */}

                    <div className="border-t border-slate-800 px-5 py-3">

                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                handleSend();
                            }}
                            className="flex flex-col gap-3 sm:flex-row"
                        >

                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSend();
                                    }
                                }}
                                placeholder="Ask your AI Mentor..."
                                className="w-full flex-1 rounded-xl border border-slate-700 bg-slate-950 px-5 py-4 text-white outline-none focus:border-blue-500"
                            />

                            <button
                                onClick={handleSend}
                                disabled={loading}
                                className="rounded-xl bg-blue-600 w-full px-7 py-4 sm:w-auto font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                            >

                                {loading ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    "Send"
                                )}

                            </button>

                        </form>

                    </div>

                </div>


            </div>

        </div>
    );
}

export default AIMentor;