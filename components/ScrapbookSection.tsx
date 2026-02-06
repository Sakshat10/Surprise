"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ScrapbookSectionProps {
    onComplete: () => void;
}

// 🎨📝 CUSTOMIZE: Replace these with your own photos and captions
const memories = [
    {
        imageSrc: "/images/Image1.png",
        caption: "The day everything changed for me 💫",
        rotation: -8,
        position: { x: -20, y: 10 },
        tapeAngle: -15,
        tapePosition: "top-left",
        stickyNote: "I still remember this day!",
        stickyColor: "#FFE4B5",
        stickyRotation: 12,
        stickers: ["💕", "✨"],
        doodle: "heart",
    },
    {
        imageSrc: "/images/Image2.png",
        caption: "Our small, stupid, perfect moments",
        rotation: 5,
        position: { x: 30, y: -15 },
        tapeAngle: 20,
        tapePosition: "top-right",
        stickyNote: "Best day ever!!",
        stickyColor: "#FFB6C1",
        stickyRotation: -8,
        stickers: ["🦋", "💗"],
        doodle: "star",
    },
    {
        imageSrc: "/images/Image3.png",
        caption: "Somewhere between these moments, you became my home",
        rotation: -3,
        position: { x: -10, y: 5 },
        tapeAngle: -10,
        tapePosition: "both",
        stickyNote: "my favorite ♡",
        stickyColor: "#B5EAD7",
        stickyRotation: 15,
        stickers: ["🌸", "💫"],
        doodle: "arrow",
    },
    {
        imageSrc: "/images/Image4.png",
        caption: "Some days blur, but the feeling of you stays.",
        rotation: 7,
        position: { x: 25, y: 20 },
        tapeAngle: 25,
        tapePosition: "top-left",
        stickyNote: "why was this lowkey perfect? 💕",
        stickyColor: "#E6E6FA",
        stickyRotation: -12,
        stickers: ["🌷", "✨"],
        doodle: "swirl",
    },
    {
        imageSrc: "/images/Image5.png",
        caption: "My favorite notification? It's still your name 💌",
        rotation: -6,
        position: { x: -15, y: -10 },
        tapeAngle: -18,
        tapePosition: "top-right",
        stickyNote: "not me smiling rn",
        stickyColor: "#FFDAB9",
        stickyRotation: 8,
        stickers: ["💕", "🦋"],
        doodle: "heart",
    },
];

// Scattered decorative elements for the desk (hidden on mobile)
const scatteredItems = [
    { type: "paperclip", rotation: 45, position: { top: "8%", left: "5%" }, color: "#E8879B" },
    { type: "paperclip", rotation: -30, position: { top: "75%", right: "8%" }, color: "#FFD700" },
    { type: "pushpin", rotation: 15, position: { top: "15%", right: "12%" }, color: "#FF6B6B" },
    { type: "pushpin", rotation: -10, position: { bottom: "20%", left: "10%" }, color: "#4ECDC4" },
    { type: "stamp", rotation: 8, position: { bottom: "12%", right: "15%" } },
    { type: "tape-roll", rotation: -20, position: { top: "60%", left: "3%" } },
];

// Doodles that appear around the page (hidden on mobile)
const doodleElements = [
    { type: "heart", position: { top: "25%", left: "8%" }, size: 30, rotation: -10 },
    { type: "star", position: { top: "40%", right: "6%" }, size: 25, rotation: 15 },
    { type: "arrow", position: { bottom: "35%", left: "12%" }, size: 40, rotation: -5 },
    { type: "swirl", position: { top: "70%", right: "10%" }, size: 35, rotation: 20 },
    { type: "heart", position: { bottom: "15%", left: "20%" }, size: 20, rotation: 25 },
];

export default function ScrapbookSection({ onComplete }: ScrapbookSectionProps) {
    const [currentPage, setCurrentPage] = useState(0);
    const [isFlipping, setIsFlipping] = useState(false);
    const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

    const nextPage = () => {
        if (isFlipping) return;

        if (currentPage < memories.length - 1) {
            setFlipDirection("next");
            setIsFlipping(true);
            setTimeout(() => {
                setCurrentPage((prev) => prev + 1);
                setTimeout(() => setIsFlipping(false), 100);
            }, 600);
        } else {
            onComplete();
        }
    };

    const prevPage = () => {
        if (isFlipping || currentPage === 0) return;

        setFlipDirection("prev");
        setIsFlipping(true);
        setTimeout(() => {
            setCurrentPage((prev) => prev - 1);
            setTimeout(() => setIsFlipping(false), 100);
        }, 600);
    };

    const memory = memories[currentPage];

    return (
        <section className="scrapbook-desk h-screen flex flex-col items-center justify-center px-4 py-2 sm:py-4 relative overflow-hidden">
            {/* Wooden Desk Background */}
            <div className="absolute inset-0 wooden-desk-bg" />

            {/* Scattered desk items - hidden on small screens */}
            <div className="hidden md:block">
                {scatteredItems.map((item, index) => (
                    <motion.div
                        key={index}
                        className="absolute pointer-events-none z-10"
                        style={{
                            ...item.position as React.CSSProperties,
                            transform: `rotate(${item.rotation}deg)`,
                        }}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        {item.type === "paperclip" && (
                            <svg width="40" height="60" viewBox="0 0 40 60" fill="none">
                                <path
                                    d="M20 5 C10 5 5 15 5 25 L5 45 C5 52 10 55 15 55 L25 55 C30 55 35 52 35 45 L35 20 C35 13 30 10 25 10 L20 10 C15 10 12 13 12 18 L12 40"
                                    stroke={item.color}
                                    strokeWidth="3"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </svg>
                        )}
                        {item.type === "pushpin" && (
                            <div className="relative">
                                <div
                                    className="w-4 h-4 rounded-full shadow-lg"
                                    style={{ backgroundColor: item.color }}
                                />
                                <div className="absolute top-3 left-1/2 w-0.5 h-3 bg-gray-400 transform -translate-x-1/2" />
                            </div>
                        )}
                        {item.type === "stamp" && (
                            <div className="stamp-decoration text-xs text-red-400 border-2 border-red-300 border-dashed px-2 py-1 rounded opacity-60">
                                ♥ LOVE ♥
                            </div>
                        )}
                        {item.type === "tape-roll" && (
                            <div className="w-10 h-10 rounded-full border-4 border-pink-200 bg-gradient-to-br from-pink-100 to-pink-50 opacity-60" />
                        )}
                    </motion.div>
                ))}

                {/* Hand-drawn doodles */}
                {doodleElements.map((doodle, index) => (
                    <motion.div
                        key={index}
                        className="absolute pointer-events-none opacity-30"
                        style={{
                            ...doodle.position as React.CSSProperties,
                            transform: `rotate(${doodle.rotation}deg)`,
                        }}
                        initial={{ opacity: 0, pathLength: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 0.5 + index * 0.15 }}
                    >
                        {doodle.type === "heart" && (
                            <svg width={doodle.size} height={doodle.size} viewBox="0 0 24 24" fill="none" stroke="#E8879B" strokeWidth="2">
                                <path d="M12 21C12 21 3 13.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 12 5C12.09 3.81 13.76 3 15.5 3C18.58 3 21 5.42 21 8.5C21 13.5 12 21 12 21Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        {doodle.type === "star" && (
                            <svg width={doodle.size} height={doodle.size} viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2">
                                <path d="M12 2L15 8.5L22 9.5L17 14.5L18 21.5L12 18L6 21.5L7 14.5L2 9.5L9 8.5L12 2Z" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        {doodle.type === "arrow" && (
                            <svg width={doodle.size} height={doodle.size * 0.5} viewBox="0 0 50 25" fill="none" stroke="#A67B5B" strokeWidth="2">
                                <path d="M5 12.5 Q15 5 25 12.5 T45 12.5" strokeLinecap="round" />
                                <path d="M38 8 L45 12.5 L38 17" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                        {doodle.type === "swirl" && (
                            <svg width={doodle.size} height={doodle.size} viewBox="0 0 30 30" fill="none" stroke="#B5EAD7" strokeWidth="2">
                                <path d="M15 15 C15 10 20 10 20 15 C20 22 10 22 10 15 C10 5 25 5 25 15 C25 28 5 28 5 15" strokeLinecap="round" />
                            </svg>
                        )}
                    </motion.div>
                ))}
            </div>

            {/* Title - Handwritten style with tape */}
            <motion.div
                className="relative mb-2 sm:mb-4 z-20"
                initial={{ opacity: 0, y: -50, rotate: -3 }}
                animate={{ opacity: 1, y: 0, rotate: -2 }}
                transition={{ duration: 0.8, type: "spring" }}
            >
                <div className="torn-paper-title px-4 sm:px-8 py-3 sm:py-4 relative">
                    {/* Washi tape holding the title */}
                    <div className="absolute -top-2 left-1/4 w-12 sm:w-16 h-4 sm:h-5 washi-tape washi-pink transform -rotate-6 z-30" />
                    <div className="absolute -top-1 right-1/4 w-10 sm:w-14 h-4 sm:h-5 washi-tape washi-mint transform rotate-8 z-30" />

                    <h1
                        className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-[#5D4037] relative z-10"
                        style={{ fontFamily: "var(--font-dancing), cursive" }}
                    >
                        Our Memories 💕
                    </h1>

                    {/* Underline doodle */}
                    <svg className="absolute -bottom-2 left-0 w-full h-4" viewBox="0 0 200 15">
                        <path d="M10,8 Q50,2 100,8 T190,6" fill="none" stroke="#E8879B" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                    </svg>
                </div>
            </motion.div>

            {/* Page number - torn notebook paper style */}
            <motion.div
                className="notebook-page-number mb-2 sm:mb-4 z-20"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
            >
                <span className="text-sm sm:text-base" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                    page {currentPage + 1} / {memories.length}
                </span>
            </motion.div>

            {/* Main Scrapbook Page Container */}
            <div className="relative z-20 w-full max-w-[95vw] sm:max-w-xl md:max-w-2xl mx-auto px-2 sm:px-0" style={{ perspective: "2000px" }}>
                {/* Stacked pages behind (visible edges) */}
                <div className="absolute -bottom-2 left-3 right-3 h-full notebook-page-bg rounded-sm opacity-40 transform rotate-1" />
                <div className="absolute -bottom-1 left-2 right-2 h-full notebook-page-bg rounded-sm opacity-60 transform -rotate-0.5" />

                {/* Main notebook/scrapbook page */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentPage}
                        className="notebook-page relative rounded-sm overflow-visible"
                        initial={{
                            rotateY: flipDirection === "next" ? 0 : 0,
                            x: flipDirection === "next" ? 0 : 0,
                            opacity: 1,
                        }}
                        animate={{
                            rotateY: isFlipping ? (flipDirection === "next" ? -90 : 90) : 0,
                            x: 0,
                            opacity: isFlipping ? 0 : 1,
                        }}
                        exit={{
                            rotateY: flipDirection === "next" ? -180 : 180,
                            opacity: 0,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: [0.4, 0, 0.2, 1],
                        }}
                        style={{
                            transformStyle: "preserve-3d",
                            transformOrigin: flipDirection === "next" ? "left center" : "right center",
                        }}
                    >
                        {/* Spiral binding holes */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 flex flex-col justify-around py-4 z-30">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="w-4 h-4 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 shadow-inner mx-auto border border-gray-400" />
                            ))}
                        </div>

                        {/* Page content area */}
                        <div className="ml-6 sm:ml-10 p-4 sm:p-6 md:p-10 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] relative">
                            {/* Lined paper effect */}
                            <div className="absolute inset-0 ml-10 pointer-events-none overflow-hidden">
                                {[...Array(20)].map((_, i) => (
                                    <div key={i} className="w-full h-[1px] bg-blue-200 opacity-30 mt-6" />
                                ))}
                                {/* Red margin line */}
                                <div className="absolute left-8 top-0 bottom-0 w-[1px] bg-red-300 opacity-40" />
                            </div>

                            {/* Polaroid Photo */}
                            <motion.div
                                className="relative inline-block"
                                style={{
                                    transform: `rotate(${memory.rotation}deg) translate(${memory.position.x}px, ${memory.position.y}px)`,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 0,
                                    zIndex: 50,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {/* Washi tape on polaroid */}
                                {(memory.tapePosition === "top-left" || memory.tapePosition === "both") && (
                                    <div
                                        className="absolute -top-3 -left-2 w-20 h-6 washi-tape washi-gold z-30"
                                        style={{ transform: `rotate(${memory.tapeAngle}deg)` }}
                                    />
                                )}
                                {(memory.tapePosition === "top-right" || memory.tapePosition === "both") && (
                                    <div
                                        className="absolute -top-3 -right-2 w-18 h-6 washi-tape washi-lavender z-30"
                                        style={{ transform: `rotate(${-memory.tapeAngle}deg)` }}
                                    />
                                )}

                                {/* Polaroid frame - no caption inside on mobile */}
                                <div className="polaroid-messy bg-white p-2 sm:p-3 pb-2 sm:pb-16 shadow-2xl relative">
                                    {/* Photo */}
                                    <div className="relative w-52 sm:w-64 md:w-72 aspect-[4/3] overflow-hidden bg-gray-100">
                                        {memory.imageSrc ? (
                                            <>
                                                <img
                                                    src={memory.imageSrc}
                                                    alt={memory.caption}
                                                    className="w-full h-full object-cover"
                                                    style={{ filter: "contrast(1.05) saturate(1.1) sepia(0.1)" }}
                                                />
                                                {/* Vintage overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-br from-amber-50/30 via-transparent to-rose-50/20" />
                                                {/* Light leak */}
                                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-radial from-orange-200/40 to-transparent rounded-full blur-2xl" />
                                            </>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100">
                                                <span className="text-6xl">💕</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Handwritten caption - only visible on sm+ screens (inside polaroid) */}
                                    <p
                                        className="hidden sm:block absolute bottom-3 left-3 right-3 text-center text-lg md:text-xl text-[#4A3728]"
                                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                                    >
                                        {memory.caption}
                                    </p>
                                </div>

                                {/* Stickers around the polaroid - hidden on mobile */}
                                {memory.stickers.map((sticker, i) => (
                                    <motion.span
                                        key={i}
                                        className="absolute text-2xl sm:text-3xl z-40 drop-shadow-lg hidden sm:block"
                                        style={{
                                            top: i === 0 ? "-15px" : "auto",
                                            bottom: i === 1 ? "20px" : "auto",
                                            left: i === 0 ? "auto" : "-20px",
                                            right: i === 0 ? "-15px" : "auto",
                                            transform: `rotate(${(i * 20) - 10}deg)`,
                                        }}
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: (i * 20) - 10 }}
                                        transition={{ delay: 0.4 + i * 0.1, type: "spring" }}
                                        whileHover={{ scale: 1.4 }}
                                    >
                                        {sticker}
                                    </motion.span>
                                ))}
                            </motion.div>

                            {/* Caption below photo - only on mobile */}
                            <motion.p
                                className="block sm:hidden text-center text-lg text-[#4A3728] mt-3 px-2"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {memory.caption}
                            </motion.p>

                            {/* Sticky Note - straight on mobile, rotated on desktop */}
                            <motion.div
                                className="sticky-note mt-3 sm:mt-0 sm:absolute"
                                style={{
                                    backgroundColor: memory.stickyColor,
                                }}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5, type: "spring" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <p className="text-sm sm:text-base text-center" style={{ fontFamily: "var(--font-caveat), cursive" }}>
                                    {memory.stickyNote}
                                </p>
                            </motion.div>

                            {/* Paper clip on corner */}
                            <div className="absolute top-4 right-4 transform rotate-12">
                                <svg width="30" height="50" viewBox="0 0 40 60" fill="none">
                                    <path
                                        d="M20 5 C10 5 5 15 5 25 L5 45 C5 52 10 55 15 55 L25 55 C30 55 35 52 35 45 L35 20 C35 13 30 10 25 10 L20 10 C15 10 12 13 12 18 L12 40"
                                        stroke="#C0C0C0"
                                        strokeWidth="3"
                                        fill="none"
                                        strokeLinecap="round"
                                    />
                                </svg>
                            </div>

                            {/* Date stamp effect */}
                            <div
                                className="absolute bottom-4 left-14 text-red-400 opacity-50 text-sm"
                                style={{
                                    fontFamily: "monospace",
                                    transform: "rotate(-5deg)",
                                }}
                            >
                                ♥ {new Date().getFullYear()} ♥
                            </div>
                        </div>

                        {/* Page curl effect */}
                        <div className="absolute bottom-0 right-0 w-16 h-16 page-curl" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation - Handmade button style */}
            <div className="flex gap-6 mt-10 z-20">
                {currentPage > 0 && (
                    <motion.button
                        onClick={prevPage}
                        className="handmade-btn-secondary"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.08, rotate: -3 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isFlipping}
                    >
                        <span className="relative z-10">← flip back</span>
                    </motion.button>
                )}

                <motion.button
                    onClick={nextPage}
                    className="handmade-btn-primary"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    whileHover={{ scale: 1.08, rotate: 3 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isFlipping}
                >
                    <span className="relative z-10">
                        {currentPage < memories.length - 1 ? "turn page →" : "continue 💝"}
                    </span>
                </motion.button>
            </div>

            {/* Page indicator - polaroid style dots */}
            <div className="flex gap-4 mt-8 z-20">
                {memories.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => {
                            if (!isFlipping && index !== currentPage) {
                                setFlipDirection(index > currentPage ? "next" : "prev");
                                setIsFlipping(true);
                                setTimeout(() => {
                                    setCurrentPage(index);
                                    setTimeout(() => setIsFlipping(false), 100);
                                }, 400);
                            }
                        }}
                        className={`page-dot ${index === currentPage ? "active" : ""}`}
                        whileHover={{ scale: 1.3, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        style={{ transform: `rotate(${(index - 2) * 8}deg)` }}
                    >
                        <div className="w-3 h-4 bg-white shadow-md relative">
                            <div className={`w-2 h-2 mx-auto mt-0.5 rounded-sm ${index === currentPage ? "bg-pink-400" : "bg-gray-200"}`} />
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Coffee stain decoration */}
            <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full opacity-10 pointer-events-none"
                style={{
                    background: "radial-gradient(circle, #8B4513 0%, transparent 70%)",
                    filter: "blur(2px)",
                }}
            />
        </section>
    );
}
