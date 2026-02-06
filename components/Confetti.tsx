"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiPiece {
    id: number;
    x: number;
    color: string;
    size: number;
    rotation: number;
    duration: number;
}

interface ConfettiProps {
    isActive: boolean;
}

export default function Confetti({ isActive }: ConfettiProps) {
    const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

    useEffect(() => {
        if (!isActive) {
            setPieces([]);
            return;
        }

        const colors = [
            "#FF6B9D", // Rose
            "#E91E63", // Deep Rose
            "#FFD700", // Gold
            "#FF7B8C", // Coral
            "#FFE4EC", // Blush Pink
            "#FF69B4", // Hot Pink
            "#FFA500", // Orange
            "#FF1493", // Deep Pink
        ];

        const shapes = ["circle", "square", "ribbon"];

        const newPieces: ConfettiPiece[] = Array.from({ length: 100 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 8 + 4,
            rotation: Math.random() * 360,
            duration: Math.random() * 2 + 2,
        }));

        setPieces(newPieces);

        // Clear confetti after animation
        const timeout = setTimeout(() => {
            // Keep some confetti floating
        }, 5000);

        return () => clearTimeout(timeout);
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
            <AnimatePresence>
                {pieces.map((piece) => (
                    <motion.div
                        key={piece.id}
                        className="absolute"
                        style={{
                            left: `${piece.x}%`,
                            top: -20,
                            width: piece.size,
                            height: piece.size * (Math.random() > 0.5 ? 1 : 2),
                            backgroundColor: piece.color,
                            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                        }}
                        initial={{
                            y: -20,
                            rotate: 0,
                            opacity: 1,
                        }}
                        animate={{
                            y: "100vh",
                            rotate: piece.rotation + 720,
                            x: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
                        }}
                        transition={{
                            duration: piece.duration + 1,
                            delay: Math.random() * 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    />
                ))}
            </AnimatePresence>

            {/* Emoji Confetti */}
            {["🎉", "💕", "✨", "💖", "🎊", "💝", "❤️", "💗"].map((emoji, index) => (
                <motion.div
                    key={`emoji-${index}`}
                    className="absolute text-3xl"
                    style={{
                        left: `${10 + index * 12}%`,
                        top: -40,
                    }}
                    initial={{ y: -40, rotate: 0, opacity: 1 }}
                    animate={{
                        y: "100vh",
                        rotate: 360,
                        x: [0, 30, -30, 20, -20],
                    }}
                    transition={{
                        duration: 3 + Math.random(),
                        delay: index * 0.1,
                        ease: "easeIn",
                    }}
                >
                    {emoji}
                </motion.div>
            ))}
        </div>
    );
}
