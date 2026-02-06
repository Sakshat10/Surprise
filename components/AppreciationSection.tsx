"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AppreciationSectionProps {
    onComplete: () => void;
}

// 💕 CUSTOMIZE: Add your own sweet one-liners
const appreciationCards = [
    {
        front: "💖",
        back: "The way you laugh at my stupid jokes... it makes my day 🥹",
    },
    {
        front: "✨",
        back: "You make even the boring days feel special 💫",
    },
    {
        front: "🌸",
        back: "Your smile is my favorite notification 📱",
    },
    {
        front: "💕",
        back: "Being around you feels easy.",
    },
];

export default function AppreciationSection({ onComplete }: AppreciationSectionProps) {
    const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
    const [showCTA, setShowCTA] = useState(false);

    const handleCardFlip = (index: number) => {
        const newFlipped = new Set(flippedCards);
        if (newFlipped.has(index)) {
            newFlipped.delete(index);
        } else {
            newFlipped.add(index);
        }
        setFlippedCards(newFlipped);

        // Show CTA after all cards have been flipped at least once
        if (newFlipped.size === appreciationCards.length) {
            setTimeout(() => setShowCTA(true), 500);
        }
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
            {/* Title */}
            <motion.h2
                className="text-2xl sm:text-3xl md:text-4xl text-center mb-2 text-[#E91E63] z-10"
                style={{ fontFamily: "var(--font-dancing), cursive" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Why I Appreciate You 💕
            </motion.h2>

            <motion.p
                className="text-sm sm:text-base text-center text-[#FF6B9D] mb-4 sm:mb-6 z-10"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                Tap each card to reveal...
            </motion.p>

            {/* Cards Grid */}
            <motion.div
                className="grid grid-cols-2 gap-3 sm:gap-4 max-w-sm sm:max-w-md z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                {appreciationCards.map((card, index) => (
                    <motion.div
                        key={index}
                        className="relative w-32 h-32 sm:w-40 sm:h-40 cursor-pointer"
                        style={{ perspective: "1000px" }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + index * 0.1 }}
                        onClick={() => handleCardFlip(index)}
                    >
                        <motion.div
                            className="w-full h-full relative"
                            style={{ transformStyle: "preserve-3d" }}
                            animate={{ rotateY: flippedCards.has(index) ? 180 : 0 }}
                            transition={{ duration: 0.6, type: "spring", damping: 15 }}
                        >
                            {/* Front of card */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center shadow-lg border-2 border-pink-200"
                                style={{ backfaceVisibility: "hidden" }}
                            >
                                <span className="text-4xl sm:text-5xl">{card.front}</span>
                            </div>

                            {/* Back of card */}
                            <div
                                className="absolute inset-0 bg-gradient-to-br from-white to-pink-50 rounded-2xl flex items-center justify-center p-3 sm:p-4 shadow-lg border-2 border-pink-300"
                                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                            >
                                <p
                                    className="text-xs sm:text-sm text-center text-[#4A3728] leading-relaxed"
                                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                                >
                                    {card.back}
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </motion.div>

            {/* CTA Button */}
            <AnimatePresence>
                {showCTA && (
                    <motion.button
                        onClick={onComplete}
                        className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-full text-base sm:text-lg shadow-lg z-10"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Okay, now let's see how well you know us 😜
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Hint if not all cards flipped */}
            {!showCTA && flippedCards.size > 0 && flippedCards.size < appreciationCards.length && (
                <motion.p
                    className="mt-4 text-sm text-[#FF6B9D]/60 z-10"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {appreciationCards.length - flippedCards.size} more to go... 💕
                </motion.p>
            )}

            {/* Background decorations */}
            {[...Array(8)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-xl pointer-events-none opacity-20"
                    style={{
                        left: `${10 + Math.random() * 80}%`,
                        top: `${10 + Math.random() * 80}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    {["💕", "✨", "🌸", "💖"][i % 4]}
                </motion.span>
            ))}
        </section>
    );
}
