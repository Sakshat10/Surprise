"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VirtualHugSectionProps {
    onComplete: () => void;
}

export default function VirtualHugSection({ onComplete }: VirtualHugSectionProps) {
    const [hugSent, setHugSent] = useState(false);
    const [showHearts, setShowHearts] = useState(false);

    const handleSendHug = () => {
        setShowHearts(true);
        setTimeout(() => {
            setHugSent(true);
        }, 800);
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
            {/* Heart explosion animation */}
            <AnimatePresence>
                {showHearts && (
                    <>
                        {[...Array(12)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute text-2xl sm:text-3xl pointer-events-none z-20"
                                style={{
                                    left: "50%",
                                    top: "50%",
                                }}
                                initial={{ x: "-50%", y: "-50%", scale: 0, opacity: 1 }}
                                animate={{
                                    x: `calc(-50% + ${(Math.random() - 0.5) * 200}px)`,
                                    y: `calc(-50% + ${(Math.random() - 0.5) * 200}px)`,
                                    scale: [0, 1.5, 1],
                                    opacity: [1, 1, 0],
                                    rotate: Math.random() * 360,
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: i * 0.05,
                                    ease: "easeOut",
                                }}
                            >
                                {["💕", "💖", "🫂", "💗", "✨", "🤍"][i % 6]}
                            </motion.span>
                        ))}
                    </>
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!hugSent ? (
                    <motion.div
                        key="hug-prompt"
                        className="text-center z-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl text-[#E91E63] mb-4"
                            style={{ fontFamily: "var(--font-dancing), cursive" }}
                        >
                            Before we continue... 💕
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-[#FF6B9D] mb-8"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                        >
                            I think you deserve something special
                        </motion.p>

                        {/* Big Hug Button */}
                        <motion.button
                            onClick={handleSendHug}
                            className="relative px-8 sm:px-12 py-4 sm:py-6 bg-gradient-to-r from-pink-100 to-pink-200 rounded-full text-4xl sm:text-5xl shadow-lg border-2 border-pink-300"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            animate={{
                                boxShadow: [
                                    "0 0 20px rgba(236, 72, 153, 0.3)",
                                    "0 0 40px rgba(236, 72, 153, 0.5)",
                                    "0 0 20px rgba(236, 72, 153, 0.3)",
                                ],
                            }}
                            transition={{
                                boxShadow: { duration: 2, repeat: Infinity },
                            }}
                        >
                            🫂
                        </motion.button>

                        <motion.p
                            className="mt-4 text-sm text-[#FF6B9D]/70"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Tap to send a virtual hug
                        </motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="hug-sent"
                        className="text-center z-10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ type: "spring", damping: 12 }}
                    >
                        <motion.span
                            className="text-6xl sm:text-7xl block mb-4"
                            animate={{ rotate: [0, -10, 10, 0] }}
                            transition={{ duration: 0.5 }}
                        >
                            🥰
                        </motion.span>

                        <motion.h2
                            className="text-2xl sm:text-3xl text-[#E91E63] mb-2"
                            style={{ fontFamily: "var(--font-dancing), cursive" }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            Hug delivered successfully! 🫂
                        </motion.h2>

                        <motion.p
                            className="text-base sm:text-lg text-[#FF6B9D] mb-8"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            That felt warm 💕
                        </motion.p>

                        <motion.button
                            onClick={onComplete}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-full text-base sm:text-lg shadow-lg"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Now let's play a little game 🎮
                        </motion.button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background decorations */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-xl pointer-events-none opacity-20"
                    style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${15 + Math.random() * 70}%`,
                    }}
                    animate={{
                        y: [0, -10, 0],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    {["💕", "🤍", "✨"][i % 3]}
                </motion.span>
            ))}
        </section>
    );
}
