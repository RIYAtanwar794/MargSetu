import { motion } from "framer-motion";


function FeatureTile({ icon, title, description }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
                duration: 0.5,
            }}
            className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-6 transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/40 hover:bg-slate-900"
        >

            <div className="mb-5 inline-flex rounded-xl bg-blue-500/10 p-3 text-blue-400 transition-transform duration-300 group-hover:scale-110">
                {icon}
            </div>

            <h3 className="text-lg font-semibold text-white transition-colors duration-300 group-hover:text-blue-300">
                {title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-400">
                {description}
            </p>

        </motion.div>
    );
}

export default FeatureTile;