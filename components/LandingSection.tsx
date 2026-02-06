"use client";

import React from "react";
import { motion } from "framer-motion";

interface LandingSectionProps {
    onComplete: () => void;
}

// 📝 CUSTOMIZE: Change these messages
const landingContent = {
    greeting: "Hey Baby Ji 💕",
    subtitle: "I made something special for you...",
    buttonText: "Ready to start this journey? 🚀",
};

export default function LandingSection({ onComplete }: LandingSectionProps) {
    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
            {/* Animated Hearts Background */}
            {[...Array(15)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-2xl pointer-events-none opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    {["💕", "💖", "💗", "💞", "🩷", "✨", "🌸"][i % 7]}
                </motion.span>
            ))}

            {/* Main Content */}
            <motion.div
                className="text-center z-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                {/* Greeting */}
                <motion.h1
                    className="text-5xl sm:text-6xl md:text-7xl text-[#E91E63] mb-4"
                    style={{ fontFamily: "var(--font-dancing), cursive" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
                >
                    {landingContent.greeting}
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                    className="text-2xl sm:text-3xl text-[#FF6B9D] mb-12"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                >
                    {landingContent.subtitle}
                </motion.p>

                {/* Big Heart Animation */}
                <motion.div
                    className="text-6xl sm:text-8xl md:text-9xl mb-8 sm:mb-12"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                >
                    💖
                </motion.div>

                {/* Start Button */}
                <motion.button
                    onClick={onComplete}
                    className="px-6 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-full text-lg sm:text-xl md:text-2xl shadow-2xl"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                    whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(233, 30, 99, 0.4)"
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    {landingContent.buttonText}
                </motion.button>

                {/* Hint */}
                <motion.p
                    className="text-base sm:text-lg text-[#FF6B9D]/60 mt-6 sm:mt-8"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    Click the button when you're ready... 🌸
                </motion.p>
            </motion.div>

            {/* Decorative sparkles */}
            <motion.div
                className="absolute top-1/4 left-1/4"
                animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                transition={{ duration: 4, repeat: Infinity }}
            >
                <span className="text-4xl">✨</span>
            </motion.div>
            <motion.div
                className="absolute bottom-1/4 right-1/4"
                animate={{ rotate: -360, scale: [1, 1.3, 1] }}
                transition={{ duration: 5, repeat: Infinity }}
            >
                <span className="text-4xl">✨</span>
            </motion.div>
        </section>
    );
}
