"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

interface TypewriterTextProps {
    text: string;
    delay?: number;
    onComplete?: () => void;
    className?: string;
}

export default function TypewriterText({
    text,
    delay = 0,
    onComplete,
    className = "",
}: TypewriterTextProps) {
    const characters = text.split("");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: delay,
                staggerChildren: 0.05,
                delayChildren: delay,
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring" as const,
                damping: 12,
                stiffness: 200,
            },
        },
    };

    return (
        <motion.span
            className={className}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={onComplete}
        >
            {characters.map((char, index) => (
                <motion.span key={index} variants={childVariants}>
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </motion.span>
    );
}
