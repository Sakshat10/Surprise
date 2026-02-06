"use client";

import React from "react";
import { motion } from "framer-motion";

interface PolaroidProps {
    imageSrc: string;
    caption: string;
    rotation?: number;
    delay?: number;
    tapeStyle?: "top-left" | "top-right" | "both" | "center";
    sticker?: string;
    stickerPosition?: { top?: number; bottom?: number; left?: number; right?: number };
}

export default function Polaroid({
    imageSrc,
    caption,
    rotation = 0,
    delay = 0,
    tapeStyle = "top-left",
    sticker,
    stickerPosition = { top: -10, right: -10 },
}: PolaroidProps) {
    return (
        <motion.div
            className="polaroid-scrapbook relative inline-block max-w-[280px] sm:max-w-[320px]"
            style={{ rotate: `${rotation}deg` }}
            initial={{ opacity: 0, y: 50, scale: 0.8, rotate: rotation - 10 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: rotation }}
            transition={{
                duration: 0.6,
                delay: delay,
                ease: "easeOut",
            }}
            whileHover={{
                scale: 1.08,
                rotate: 0,
                zIndex: 10,
                transition: { duration: 0.3 },
            }}
        >
            {/* Washi Tape Decorations */}
            {(tapeStyle === "top-left" || tapeStyle === "both") && (
                <div className="absolute -top-3 -left-2 w-16 h-5 washi-tape washi-pink transform -rotate-12 z-20" />
            )}
            {(tapeStyle === "top-right" || tapeStyle === "both") && (
                <div className="absolute -top-3 -right-2 w-16 h-5 washi-tape washi-mint transform rotate-12 z-20" />
            )}
            {tapeStyle === "center" && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-20 h-5 washi-tape washi-gold z-20" />
            )}

            {/* Polaroid Frame with paper texture */}
            <div className="bg-white p-3 pb-14 sm:pb-16 shadow-xl relative overflow-visible">
                {/* Vintage photo corner effect */}
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-[#C4A77D] opacity-40" />
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-[#C4A77D] opacity-40" />
                <div className="absolute bottom-12 left-2 w-4 h-4 border-l-2 border-b-2 border-[#C4A77D] opacity-40" />
                <div className="absolute bottom-12 right-2 w-4 h-4 border-r-2 border-b-2 border-[#C4A77D] opacity-40" />

                {/* Photo Container */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-100">
                    {imageSrc ? (
                        <>
                            <img
                                src={imageSrc}
                                alt={caption}
                                className="w-full h-full object-cover"
                                style={{ filter: "contrast(1.05) saturate(1.1)" }}
                            />
                            {/* Vintage photo overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 via-transparent to-rose-100/10 pointer-events-none" />
                            {/* Light leak effect */}
                            <div className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-radial from-orange-200/30 to-transparent rounded-full blur-xl pointer-events-none" />
                        </>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-rose-100 relative">
                            <span className="text-5xl z-10">💕</span>
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSIjRTg4NEE4IiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')] opacity-50" />
                        </div>
                    )}

                    {/* Film grain texture overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-multiply"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                        }}
                    />
                </div>

                {/* Caption area with handwritten style */}
                <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-2">
                    <p
                        className="text-center text-lg sm:text-xl text-[#5D4037] leading-snug"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                    >
                        {caption}
                    </p>
                    {/* Handwritten underline */}
                    <svg className="mx-auto mt-1 w-24 h-3" viewBox="0 0 100 10">
                        <path
                            d="M5,5 Q20,8 40,5 T75,6 T95,5"
                            fill="none"
                            stroke="#E8B4BC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                </div>

                {/* Paper texture overlay */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Cfilter id='paper'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.04' numOctaves='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paper)'/%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Decorative Sticker */}
            {sticker && (
                <motion.span
                    className="absolute text-3xl z-30 drop-shadow-md"
                    style={stickerPosition as React.CSSProperties}
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.3, rotate: 15 }}
                >
                    {sticker}
                </motion.span>
            )}

            {/* Shadow under polaroid */}
            <div className="absolute -bottom-2 left-2 right-2 h-4 bg-black/5 blur-md rounded-full transform skewX(-3deg)" />
        </motion.div>
    );
}
