"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FloatingHeart {
    id: number;
    x: number;
    size: number;
    duration: number;
    delay: number;
    emoji: string;
}

export default function FloatingHearts() {
    const [hearts, setHearts] = useState<FloatingHeart[]>([]);

    useEffect(() => {
        const emojis = ["❤️", "💕", "💖", "💗", "💓", "💞", "💝", "🩷", "🤍", "💜"];

        const createHeart = (): FloatingHeart => ({
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            size: Math.random() * 20 + 15,
            duration: Math.random() * 4 + 6,
            delay: 0,
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
        });

        // Initial hearts
        const initial = Array.from({ length: 15 }, () => ({
            ...createHeart(),
            delay: Math.random() * 5,
        }));
        setHearts(initial);

        // Continuously add new hearts
        const interval = setInterval(() => {
            setHearts((prev) => {
                const newHearts = [...prev, createHeart()];
                // Remove old hearts to prevent memory issues
                if (newHearts.length > 30) {
                    return newHearts.slice(-25);
                }
                return newHearts;
            });
        }, 800);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
            <AnimatePresence>
                {hearts.map((heart) => (
                    <motion.div
                        key={heart.id}
                        className="absolute bottom-0"
                        style={{
                            left: `${heart.x}%`,
                            fontSize: `${heart.size}px`,
                        }}
                        initial={{ y: "100vh", opacity: 0 }}
                        animate={{
                            y: "-100vh",
                            opacity: [0, 1, 1, 0],
                            x: [0, 20, -20, 10, 0],
                        }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: heart.duration,
                            delay: heart.delay,
                            ease: "linear",
                            x: {
                                duration: heart.duration,
                                repeat: Infinity,
                                ease: "easeInOut",
                            },
                        }}
                    >
                        {heart.emoji}
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
}
