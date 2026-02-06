"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FloatingHearts from "./FloatingHearts";
import Confetti from "./Confetti";

// 📝 CUSTOMIZE: Final proposal messages
const proposalCopy = {
    intro1: "Itna sab kar liya tumne mere liye…", // 📝 CUSTOMIZE
    intro2: "Ab ek simple sa sawaal hai, bitchu ji 💖", // 📝 CUSTOMIZE
    button: "Will you be my Valentine?", // 📝 CUSTOMIZE
    yesResponse1: "WOHOOOOOOOOOOOOO!!!!!!!", // 📝 CUSTOMIZE
    yesResponse2: "Be Ready For Valentine's Day, my love. Mst khane Pine Ja rhe hai Hum tere paiso se", // 📝 CUSTOMIZE
};

export default function ProposalSection() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [answered, setAnswered] = useState(false);
    const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });

    const handleYes = () => {
        setShowConfetti(true);
        setAnswered(true);
    };

    // Fun: Make the "No" button run away (optional playful element)
    const handleNoHover = () => {
        const maxX = 150;
        const maxY = 100;
        setNoButtonPosition({
            x: (Math.random() - 0.5) * maxX * 2,
            y: (Math.random() - 0.5) * maxY * 2,
        });
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden bg-gradient-to-b from-[#FFE4EC] via-[#FFD1DC] to-[#FFCAD4]">
            {/* Floating Hearts Background */}
            <FloatingHearts />

            {/* Confetti Celebration */}
            <Confetti isActive={showConfetti} />

            {/* Main Content */}
            <AnimatePresence mode="wait">
                {!answered ? (
                    <motion.div
                        key="proposal"
                        className="text-center z-10 relative"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Intro Text */}
                        <motion.p
                            className="text-2xl sm:text-3xl md:text-4xl text-[#E91E63] mb-4"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {proposalCopy.intro1}
                        </motion.p>

                        <motion.p
                            className="text-2xl sm:text-3xl md:text-4xl text-[#E91E63] mb-12"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            {proposalCopy.intro2}
                        </motion.p>

                        {/* Big Heart */}
                        <motion.div
                            className="text-8xl sm:text-9xl mb-8"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1, type: "spring", damping: 10 }}
                        >
                            <motion.span
                                className="inline-block"
                                animate={{
                                    scale: [1, 1.1, 1, 1.15, 1],
                                }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                💖
                            </motion.span>
                        </motion.div>

                        {/* Main Question Button */}
                        <motion.button
                            onClick={handleYes}
                            className="btn-romantic text-xl sm:text-2xl md:text-3xl px-6 sm:px-10 py-4 sm:py-5 animate-pulse-glow"
                            style={{ fontFamily: "var(--font-dancing), cursive" }}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, type: "spring", damping: 10 }}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {proposalCopy.button}
                        </motion.button>

                        {/* Optional: Playful "No" button that runs away */}
                        <motion.div
                            className="mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                        >
                            <motion.button
                                className="text-lg text-[#FF6B9D]/60 underline cursor-pointer"
                                style={{
                                    fontFamily: "var(--font-caveat), cursive",
                                    transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                                }}
                                onMouseEnter={handleNoHover}
                                onTouchStart={handleNoHover}
                                transition={{ type: "spring", damping: 10 }}
                            >
                                Hmm, let me think...
                            </motion.button>
                        </motion.div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="response"
                        className="text-center z-10 relative"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, type: "spring", damping: 10 }}
                    >
                        {/* Celebration Emoji */}
                        <motion.div
                            className="text-8xl sm:text-9xl mb-8"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.2, type: "spring", damping: 8 }}
                        >
                            🎉
                        </motion.div>

                        {/* Response Text */}
                        <motion.p
                            className="text-3xl sm:text-4xl md:text-5xl text-[#E91E63] mb-4"
                            style={{ fontFamily: "var(--font-dancing), cursive" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {proposalCopy.yesResponse1}
                        </motion.p>

                        <motion.p
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-[#E91E63] px-2"
                            style={{ fontFamily: "var(--font-dancing), cursive" }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                        >
                            {proposalCopy.yesResponse2}
                        </motion.p>

                        {/* Hearts Row */}
                        <motion.div
                            className="mt-12 flex justify-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2 }}
                        >
                            {["💕", "💖", "❤️", "💖", "💕"].map((heart, index) => (
                                <motion.span
                                    key={index}
                                    className="text-4xl sm:text-5xl"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{
                                        delay: 1.4 + index * 0.1,
                                        type: "spring",
                                        damping: 8,
                                    }}
                                >
                                    {heart}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* Signature */}
                        <motion.p
                            className="mt-12 text-xl text-[#FF6B9D]"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                        >
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
