import { useEffect, useState } from "react";
import {
    getRevisionQueue,
    markAsRevised,
} from "../../services/problemService";
import RevisionSection from "../../components/revision/RevisionSection";

function Revision() {
    const [queue, setQueue] = useState({
        overdue: [],
        dueToday: [],
        upcoming: [],
    });

    const [counts, setCounts] = useState({
        overdue: 0,
        dueToday: 0,
        upcoming: 0,
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQueue();
    }, []);

    const fetchQueue = async () => {
        try {
            const res = await getRevisionQueue();

            setQueue(res.data.queue);
            setCounts(res.data.counts);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleRevise = async (id) => {
        try {
            await markAsRevised(id);
            fetchQueue();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-4xl font-bold text-white">
                    Revision Scheduler
                </h1>

                <p className="mt-2 text-slate-400">
                    Revise your solved problems at the perfect time.
                </p>

                {/* Stats Cards */}

                <div className="mt-8 grid gap-6 md:grid-cols-3">

                    <div className="rounded-2xl border border-red-800 bg-red-950/30 p-4 sm:p-5 lg:p-6">

                        <h3 className="text-sm font-medium text-red-400">
                            🔴 Overdue
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-white">
                            {counts.overdue}
                        </p>

                    </div>

                    <div className="rounded-2xl border border-yellow-700 bg-yellow-950/30 p-6">

                        <h3 className="text-sm font-medium text-yellow-400">
                            🟡 Due Today
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-white">
                            {counts.dueToday}
                        </p>

                    </div>

                    <div className="rounded-2xl border border-green-800 bg-green-950/30 p-6">

                        <h3 className="text-sm font-medium text-green-400">
                            🟢 Upcoming
                        </h3>

                        <p className="mt-3 text-4xl font-bold text-white">
                            {counts.upcoming}
                        </p>

                    </div>

                </div>


                {/* Revision Queue */}

                <div className="mt-10 space-y-8">

                    <RevisionSection
                        title="🔴 Overdue"
                        color="red"
                        emptyMessage="No overdue revisions 🎉"
                        problems={queue.overdue}
                        handleRevise={handleRevise}
                    />

                    <RevisionSection
                        title="🟡 Due Today"
                        color="yellow"
                        emptyMessage="Nothing due today."
                        problems={queue.dueToday}
                        handleRevise={handleRevise}
                    />

                    <RevisionSection
                        title="🟢 Upcoming"
                        color="green"
                        emptyMessage="No upcoming revisions."
                        problems={queue.upcoming}
                        handleRevise={handleRevise}
                    />

                </div>


            </div>

        </div>
    );
}

export default Revision;