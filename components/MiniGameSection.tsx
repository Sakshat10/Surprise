"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MiniGameSectionProps {
    onComplete: () => void;
}

// 💕 CUSTOMIZE: Messages shown during the game
const loveMessages = [
    "Finding our way... 💕",
    "Almost there! 💖",
    "Love finds a way �",
    "Nothing can stop us! �",
    "Together forever ❤️",
];

// Simple maze layout (0 = path, 1 = wall)
// This creates a cute heart-shaped path obstacle
const mazeLayout = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1],
    [1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1],
    [1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1],
    [1, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
    [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

const ROWS = mazeLayout.length;
const COLS = mazeLayout[0].length;

export default function MiniGameSection({ onComplete }: MiniGameSectionProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [playerPos, setPlayerPos] = useState({ row: 1, col: 1 });
    const [path, setPath] = useState<{ row: number; col: number }[]>([{ row: 1, col: 1 }]);
    const [isComplete, setIsComplete] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [currentMessage, setCurrentMessage] = useState("");
    const [cellSize, setCellSize] = useState(40);

    // Goal position (bottom right area)
    const goalPos = { row: 10, col: 10 };

    // Calculate cell size based on container
    useEffect(() => {
        const updateSize = () => {
            if (containerRef.current) {
                const rect = containerRef.current.getBoundingClientRect();
                const maxCellWidth = (rect.width - 40) / COLS;
                const maxCellHeight = (rect.height - 40) / ROWS;
                setCellSize(Math.floor(Math.min(maxCellWidth, maxCellHeight, 40)));
            }
        };
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    // Handle keyboard movement
    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (isComplete) return;

        let newRow = playerPos.row;
        let newCol = playerPos.col;

        switch (e.key) {
            case "ArrowUp":
            case "w":
            case "W":
                newRow--;
                break;
            case "ArrowDown":
            case "s":
            case "S":
                newRow++;
                break;
            case "ArrowLeft":
            case "a":
            case "A":
                newCol--;
                break;
            case "ArrowRight":
            case "d":
            case "D":
                newCol++;
                break;
            default:
                return;
        }

        e.preventDefault();

        // Check bounds and walls
        if (
            newRow >= 0 && newRow < ROWS &&
            newCol >= 0 && newCol < COLS &&
            mazeLayout[newRow][newCol] === 0
        ) {
            setPlayerPos({ row: newRow, col: newCol });
            setPath(prev => [...prev, { row: newRow, col: newCol }]);

            // Update message based on progress
            const progress = (newCol / COLS);
            const msgIndex = Math.min(Math.floor(progress * loveMessages.length), loveMessages.length - 1);
            setCurrentMessage(loveMessages[msgIndex]);

            // Check if reached goal
            if (newRow === goalPos.row && newCol === goalPos.col) {
                setIsComplete(true);
                setShowSuccess(true);
                setTimeout(() => onComplete(), 3000);
            }
        }
    }, [playerPos, isComplete, onComplete]);

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [handleKeyDown]);

    // Handle touch/click movement
    const handleCellClick = (row: number, col: number) => {
        if (isComplete) return;

        // Only allow moving to adjacent cells
        const rowDiff = Math.abs(row - playerPos.row);
        const colDiff = Math.abs(col - playerPos.col);

        if ((rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1)) {
            if (mazeLayout[row][col] === 0) {
                setPlayerPos({ row, col });
                setPath(prev => [...prev, { row, col }]);

                const progress = col / COLS;
                const msgIndex = Math.min(Math.floor(progress * loveMessages.length), loveMessages.length - 1);
                setCurrentMessage(loveMessages[msgIndex]);

                if (row === goalPos.row && col === goalPos.col) {
                    setIsComplete(true);
                    setShowSuccess(true);
                    setTimeout(() => onComplete(), 3000);
                }
            }
        }
    };

    const resetGame = () => {
        setPlayerPos({ row: 1, col: 1 });
        setPath([{ row: 1, col: 1 }]);
        setIsComplete(false);
        setCurrentMessage("");
    };

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2 relative overflow-hidden">
            {/* Title */}
            <motion.h2
                className="text-xl sm:text-3xl md:text-4xl text-center mb-1 sm:mb-2 text-[#E91E63] z-10 px-2"
                style={{ fontFamily: "var(--font-dancing), cursive" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                Find Your Way to My Heart 💕
            </motion.h2>

            {/* Instructions */}
            <motion.p
                className="text-sm sm:text-lg text-center text-[#FF6B9D] mb-1 sm:mb-2 z-10 px-2"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
            >
                Maze solve karo aur mujh tak pahuncho! 🌸
            </motion.p>

            {/* Visual Arrow Keys Guide - smaller on mobile */}
            <motion.div
                className="flex flex-col items-center gap-1 mb-4 z-10"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
            >
                <div className="flex gap-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/60 rounded-lg flex items-center justify-center shadow-sm border border-pink-200 text-[#E91E63] font-bold text-sm sm:text-base">
                        ↑
                    </div>
                </div>
                <div className="flex gap-1">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/60 rounded-lg flex items-center justify-center shadow-sm border border-pink-200 text-[#E91E63] font-bold text-sm sm:text-base">
                        ←
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/60 rounded-lg flex items-center justify-center shadow-sm border border-pink-200 text-[#E91E63] font-bold text-sm sm:text-base">
                        ↓
                    </div>
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/60 rounded-lg flex items-center justify-center shadow-sm border border-pink-200 text-[#E91E63] font-bold text-sm sm:text-base">
                        →
                    </div>
                </div>
                <span className="text-xs sm:text-sm text-[#FF6B9D]/80 mt-1 text-center px-2" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    Tap cells to move!
                </span>
            </motion.div>

            {/* Current Message */}
            <AnimatePresence>
                {currentMessage && !showSuccess && (
                    <motion.div
                        className="text-2xl text-[#E91E63] mb-4 z-10 text-center h-8"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        key={currentMessage}
                    >
                        {currentMessage}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Maze Container */}
            <motion.div
                ref={containerRef}
                className="relative glass rounded-2xl p-5 z-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
            >
                {/* Start Heart Label - hidden on small screens */}
                <div className="absolute -left-12 sm:-left-16 top-1/2 -translate-y-1/2 flex-col items-center hidden sm:flex">
                    <span className="text-3xl sm:text-4xl">💖</span>
                    <span className="text-sm sm:text-lg text-[#E91E63]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                        Me
                    </span>
                </div>

                {/* End Heart Label - hidden on small screens */}
                <div className="absolute -right-12 sm:-right-16 top-1/2 -translate-y-1/2 flex-col items-center hidden sm:flex">
                    <span className="text-3xl sm:text-4xl">💖</span>
                    <span className="text-sm sm:text-lg text-[#E91E63]" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                        You
                    </span>
                </div>

                {/* Maze Grid */}
                <div
                    className="grid gap-0.5"
                    style={{
                        gridTemplateColumns: `repeat(${COLS}, ${cellSize}px)`,
                        gridTemplateRows: `repeat(${ROWS}, ${cellSize}px)`,
                    }}
                >
                    {mazeLayout.map((row, rowIndex) =>
                        row.map((cell, colIndex) => {
                            const isPlayer = playerPos.row === rowIndex && playerPos.col === colIndex;
                            const isGoal = goalPos.row === rowIndex && goalPos.col === colIndex;
                            const isStart = rowIndex === 1 && colIndex === 1;
                            const isPath = path.some(p => p.row === rowIndex && p.col === colIndex);
                            const isWall = cell === 1;

                            return (
                                <motion.div
                                    key={`${rowIndex}-${colIndex}`}
                                    className={`
                                        rounded-sm flex items-center justify-center cursor-pointer
                                        transition-all duration-200
                                        ${isWall
                                            ? "bg-gradient-to-br from-pink-200 to-pink-300 shadow-inner"
                                            : isPath
                                                ? "bg-gradient-to-br from-pink-100 to-rose-100"
                                                : "bg-white/80 hover:bg-pink-50"
                                        }
                                        ${isPlayer ? "ring-2 ring-pink-400" : ""}
                                    `}
                                    style={{ width: cellSize, height: cellSize }}
                                    onClick={() => handleCellClick(rowIndex, colIndex)}
                                    whileHover={!isWall ? { scale: 1.05 } : {}}
                                    whileTap={!isWall ? { scale: 0.95 } : {}}
                                >
                                    {isPlayer && (
                                        <motion.span
                                            className="text-2xl"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 0.5, repeat: Infinity }}
                                        >
                                            💝
                                        </motion.span>
                                    )}
                                    {isGoal && !isPlayer && (
                                        <motion.span
                                            className="text-2xl"
                                            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                        >
                                            💖
                                        </motion.span>
                                    )}
                                    {isStart && !isPlayer && (
                                        <span className="text-xs text-pink-400">Start</span>
                                    )}
                                    {isPath && !isPlayer && !isGoal && !isStart && (
                                        <span className="text-pink-300 text-lg">•</span>
                                    )}
                                </motion.div>
                            );
                        })
                    )}
                </div>
            </motion.div>

            {/* Reset Button */}
            {path.length > 1 && !isComplete && (
                <motion.button
                    onClick={resetGame}
                    className="mt-6 px-6 py-3 bg-white/50 hover:bg-white/70 rounded-xl text-[#E91E63] z-10"
                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Reset & Try Again 🔄
                </motion.button>
            )}


            {/* Success Message */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {/* Confetti */}
                        {[...Array(30)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="fixed text-2xl pointer-events-none"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: -50,
                                }}
                                initial={{ y: 0, opacity: 1, rotate: 0 }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    opacity: [1, 1, 0],
                                    rotate: Math.random() * 720 - 360,
                                }}
                                transition={{
                                    duration: 2 + Math.random() * 2,
                                    delay: Math.random() * 0.5,
                                    ease: "easeOut",
                                }}
                            >
                                {["🎊", "🎉", "✨", "💖", "💕", "🩷", "⭐", "🌸"][Math.floor(Math.random() * 8)]}
                            </motion.span>
                        ))}

                        <motion.div
                            className="glass p-10 rounded-3xl text-center max-w-md mx-4"
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", damping: 10 }}
                        >
                            <motion.h3
                                className="text-4xl sm:text-5xl text-[#E91E63] mb-4"
                                style={{ fontFamily: "var(--font-dancing), cursive" }}
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            >
                                Wohoooooooo!!!! 🎉🎊
                            </motion.h3>
                            <motion.div
                                className="text-6xl mb-4"
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                💞
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decorative floating hearts */}
            {[...Array(6)].map((_, i) => (
                <motion.span
                    key={i}
                    className="absolute text-xl opacity-20 pointer-events-none"
                    style={{
                        left: `${10 + i * 15}%`,
                        top: `${15 + (i % 3) * 25}%`,
                    }}
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 10, -10, 0],
                    }}
                    transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                    }}
                >
                    {["💕", "💗", "💓", "💞", "🩷", "🌸"][i]}
                </motion.span>
            ))}
        </section>
    );
}
