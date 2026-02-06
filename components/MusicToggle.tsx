"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MusicToggle() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const hasTriedAutoplay = useRef(false);

    useEffect(() => {
        // 🎵 CUSTOMIZE: Replace with your romantic background music file
        audioRef.current = new Audio("/music/Perfect.mp3");
        audioRef.current.loop = true;
        audioRef.current.volume = 0.3;

        audioRef.current.addEventListener("canplaythrough", () => {
            setIsLoaded(true);

            // Try to autoplay when audio is ready
            if (!hasTriedAutoplay.current) {
                hasTriedAutoplay.current = true;
                tryAutoplay();
            }
        });

        audioRef.current.addEventListener("error", () => {
            console.log("Music file not found. Add your music to /public/music/Perfect.mp3");
            setIsLoaded(true);
        });

        // Fallback: Start music on first user interaction with page
        const startMusicOnInteraction = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play().then(() => {
                    setIsPlaying(true);
                    // Remove listeners after first successful play
                    document.removeEventListener("click", startMusicOnInteraction);
                    document.removeEventListener("touchstart", startMusicOnInteraction);
                }).catch(() => { });
            }
        };

        document.addEventListener("click", startMusicOnInteraction);
        document.addEventListener("touchstart", startMusicOnInteraction);

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            document.removeEventListener("click", startMusicOnInteraction);
            document.removeEventListener("touchstart", startMusicOnInteraction);
        };
    }, []);

    const tryAutoplay = () => {
        if (!audioRef.current) return;

        audioRef.current.play().then(() => {
            setIsPlaying(true);
        }).catch((err) => {
            // Autoplay blocked - will start on first user interaction
            console.log("Autoplay blocked, music will start on first click");
        });
    };

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch((err) => {
                console.log("Audio playback failed:", err);
            });
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <motion.button
            onClick={toggleMusic}
            className="fixed top-4 right-4 z-50 w-12 h-12 rounded-full glass flex items-center justify-center cursor-pointer"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            title={isPlaying ? "Pause Music" : "Play Music"}
        >
            <AnimatePresence mode="wait">
                {isPlaying ? (
                    <motion.span
                        key="playing"
                        initial={{ opacity: 0, rotate: -180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 180 }}
                        className="text-2xl"
                    >
                        🎵
                    </motion.span>
                ) : (
                    <motion.span
                        key="paused"
                        initial={{ opacity: 0, rotate: 180 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: -180 }}
                        className="text-2xl grayscale"
                    >
                        🎵
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Playing indicator animation */}
            {isPlaying && (
                <motion.div
                    className="absolute inset-0 rounded-full border-2 border-pink-400"
                    initial={{ scale: 1, opacity: 0.8 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: Infinity }}
                />
            )}
        </motion.button>
    );
}
