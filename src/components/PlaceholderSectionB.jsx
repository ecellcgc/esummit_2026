import React from 'react'
import { motion } from 'framer-motion'

function PlaceholderSectionB() {
    return (
        <section
            id="page6"
            className="relative w-full max-w-[100vw] min-h-0 h-auto m-0 p-0 overflow-x-hidden overflow-y-hidden bg-black py-6 md:py-8"
            style={{
                backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
                backgroundAttachment: "fixed",
            }}
        >

            <div className="flex items-center justify-center h-full w-full">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-white/20 text-center"
                >
                </motion.div>
            </div>
        </section>
    )
}

export default PlaceholderSectionB
