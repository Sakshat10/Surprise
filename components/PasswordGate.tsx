"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface PasswordGateProps {
    onUnlock: () => void;
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [shake, setShake] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === "1014") {
            onUnlock();
        } else {
            setError(true);
            setShake(true);
            setTimeout(() => {
                setShake(false);
                setError(false);
            }, 500);
            setPassword("");
        }
    };

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100">
            {/* Floating hearts background */}
            {[...Array(15)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-2xl sm:text-3xl pointer-events-none opacity-20"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 2,
                        repeat: Infinity,
                        delay: Math.random() * 2,
                    }}
                >
                    {["💕", "💖", "🌸", "✨", "💗"][i % 5]}
                </motion.span>
            ))}

            {/* Main content */}
            <motion.div
                className="relative z-10 text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
            >
                {/* Lock icon */}
                <motion.div
                    className="text-6xl sm:text-7xl mb-6"
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                    }}
                >
                    🔐
                </motion.div>

                {/* Title */}
                <motion.h1
                    className="text-3xl sm:text-4xl md:text-5xl text-[#E91E63] mb-4"
                    style={{ fontFamily: "var(--font-dancing), cursive" }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    Something Special Awaits 💕
                </motion.h1>

                <motion.p
                    className="text-lg sm:text-xl text-[#FF6B9D] mb-8"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Enter the secret code to unlock...
                </motion.p>

                {/* Password form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="max-w-sm mx-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <motion.div
                        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                    >
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter code..."
                            className={`w-full px-6 py-4 text-center text-xl rounded-full border-2 ${error
                                    ? "border-red-400 bg-red-50"
                                    : "border-pink-300 bg-white/80"
                                } focus:outline-none focus:border-pink-500 transition-all`}
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            autoFocus
                        />
                    </motion.div>

                    {error && (
                        <motion.p
                            className="text-red-500 mt-2 text-sm"
                            style={{ fontFamily: "var(--font-caveat), cursive" }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            Oops! Wrong code, try again 💔
                        </motion.p>
                    )}

                    <motion.button
                        type="submit"
                        className="mt-6 px-8 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-full text-lg shadow-lg"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Unlock 🔓
                    </motion.button>
                </motion.form>

                {/* Hint */}
                <motion.p
                    className="mt-8 text-md text-[#FF6B9D]/60"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    Hint: It begins with you, ends with me... 💭
                </motion.p>
            </motion.div>
        </section>
    );
}
