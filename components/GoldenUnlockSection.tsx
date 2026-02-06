"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TypewriterText from "./TypewriterText";

interface GoldenUnlockSectionProps {
    onComplete: () => void;
}

// 📝 CUSTOMIZE: Golden unlock screen messages
const unlockMessages = [
    "You have unlocked the Golden Question…", // 📝 CUSTOMIZE
    "Bas ek last sawaal bacha hai, bitchu ji ✨", // 📝 CUSTOMIZE
];

export default function GoldenUnlockSection({ onComplete }: GoldenUnlockSectionProps) {
    const [messageIndex, setMessageIndex] = useState(0);
    const [showButton, setShowButton] = useState(false);
    const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

    // Generate sparkles
    useEffect(() => {
        const newSparkles = Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 2,
        }));
        setSparkles(newSparkles);
    }, []);

    const handleMessageComplete = () => {
        if (messageIndex < unlockMessages.length - 1) {
            setTimeout(() => {
                setMessageIndex((prev) => prev + 1);
            }, 500);
        } else {
            setTimeout(() => {
                setShowButton(true);
            }, 800);
        }
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
            {/* Darkened Background */}
            <motion.div
                className="absolute inset-0 bg-black/60 z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            />

            {/* Golden Glow Effect */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center z-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
            >
                <motion.div
                    className="w-64 h-64 sm:w-96 sm:h-96 rounded-full"
                    style={{
                        background: "radial-gradient(circle, rgba(255,215,0,0.4) 0%, rgba(255,165,0,0.2) 40%, transparent 70%)",
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </motion.div>

            {/* Sparkles */}
            {sparkles.map((sparkle) => (
                <motion.div
                    key={sparkle.id}
                    className="absolute text-2xl z-10"
                    style={{
                        left: `${sparkle.x}%`,
                        top: `${sparkle.y}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 2,
                        delay: sparkle.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    ✨
                </motion.div>
            ))}

            {/* Golden Frame */}
            <motion.div
                className="relative z-20 w-[90vw] max-w-md sm:max-w-lg md:max-w-2xl mx-auto text-center p-4 sm:p-8 md:p-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                {/* Decorative Border */}
                <div className="absolute inset-0 rounded-2xl border-4 border-[#FFD700]/50" />
                <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                        boxShadow: "0 0 40px rgba(255, 215, 0, 0.5), inset 0 0 40px rgba(255, 215, 0, 0.2)",
                    }}
                    animate={{
                        boxShadow: [
                            "0 0 40px rgba(255, 215, 0, 0.5), inset 0 0 40px rgba(255, 215, 0, 0.2)",
                            "0 0 60px rgba(255, 215, 0, 0.8), inset 0 0 60px rgba(255, 215, 0, 0.4)",
                            "0 0 40px rgba(255, 215, 0, 0.5), inset 0 0 40px rgba(255, 215, 0, 0.2)",
                        ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                />

                {/* Messages Container */}
                <div className="min-h-[120px] flex flex-col items-center justify-center relative z-10">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={messageIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h2
                                className="text-lg sm:text-2xl md:text-3xl lg:text-4xl text-[#FFD700] px-2"
                                style={{ fontFamily: "var(--font-dancing), cursive" }}
                            >
                                <TypewriterText
                                    text={unlockMessages[messageIndex]}
                                    onComplete={handleMessageComplete}
                                />
                            </h2>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Reveal Button */}
                <AnimatePresence>
                    {showButton && (
                        <motion.button
                            onClick={onComplete}
                            className="btn-golden mt-8 relative overflow-hidden"
                            initial={{ opacity: 0, scale: 0, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ type: "spring", damping: 15 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {/* Glowing Animation Border */}
                            <motion.span
                                className="absolute inset-0 rounded-full"
                                style={{
                                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                                }}
                                animate={{
                                    x: ["-100%", "100%"],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <span className="relative z-10">Reveal the Question ✨</span>
                        </motion.button>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom Decorative Hearts */}
            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                {["💛", "💖", "💛"].map((heart, index) => (
                    <motion.span
                        key={index}
                        className="text-3xl"
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                            duration: 1.5,
                            delay: index * 0.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    >
                        {heart}
                    </motion.span>
                ))}
            </motion.div>
        </section>
    );
}
