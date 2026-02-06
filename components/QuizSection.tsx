"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuizSectionProps {
    onComplete: () => void;
}

// ❓ CUSTOMIZE: Replace these questions with your own inside jokes and memories
const quizQuestions = [
    {
        question: "Our favourite thing to do together? 💕",
        options: [
            "Netflix and chill 📺",
            "Bathing together 🛁",
            "Eating food 🍕",
            "All of the above 😏",
        ],
        correct: 3,
        specialModal: "But I like bathing together more 😏🛁💕",
    },
    {
        question: "Which body part of urs is my fav? �",
        options: [
            "Your eyes 👁️",
            "Your lips 💋",
            "Your ass 🍑",
            "Whole you 💖",
        ],
        correct: 3,
        specialModal: "But I like that ass more 😏🍑",
    },
    {
        question: "Which song reminds me of you? 🎵",
        options: [
            "Perfect - Ed Sheeran",
            "All of Me - John Legend",
            "Can't Help Falling in Love",
            "Our secret song 😉",
        ],
        correct: 3,
    },
];

const feedbackMessages = {
    correct: "Correct! 💖",
    wrong: "Oopsie! 🥺",
    allCorrect: "Yaaay! Perfect Score! 💖✨",
    someWrong: "opsieeee! Galat answer bitchu ji 🥺",
};

export default function QuizSection({ onComplete }: QuizSectionProps) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [answers, setAnswers] = useState<boolean[]>([]);
    const [showResults, setShowResults] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [showSpecialModal, setShowSpecialModal] = useState(false);
    const [specialModalMessage, setSpecialModalMessage] = useState("");

    const score = answers.filter(Boolean).length;

    const handleAnswer = (answerIndex: number) => {
        if (showFeedback || showSpecialModal) return;

        setSelectedAnswer(answerIndex);
        const correct = answerIndex === quizQuestions[currentQuestion].correct;
        setIsCorrect(correct);
        setShowFeedback(true);

        const newAnswers = [...answers, correct];
        setAnswers(newAnswers);

        const currentQ = quizQuestions[currentQuestion];

        // Check if this question has a special modal message
        if (correct && currentQ.specialModal) {
            setTimeout(() => {
                setShowFeedback(false);
                setSpecialModalMessage(currentQ.specialModal!);
                setShowSpecialModal(true);
            }, 800);
        } else {
            // Normal flow
            setTimeout(() => {
                if (currentQuestion < quizQuestions.length - 1) {
                    setCurrentQuestion((prev) => prev + 1);
                    setSelectedAnswer(null);
                    setShowFeedback(false);
                } else {
                    setShowFeedback(false);
                    setShowResults(true);
                }
            }, 1200);
        }
    };

    const handleSpecialModalClose = () => {
        setShowSpecialModal(false);
        setSpecialModalMessage("");

        // Advance to next question or show results
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
            setSelectedAnswer(null);
        } else {
            setShowResults(true);
        }
    };

    const handleRetry = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowFeedback(false);
        setAnswers([]);
        setShowResults(false);
        setAttempts((prev) => prev + 1);
    };

    const handleContinue = () => {
        if (score === quizQuestions.length) {
            onComplete();
        }
    };

    const question = quizQuestions[currentQuestion];

    // Results Screen
    if (showResults) {
        const allCorrect = score === quizQuestions.length;

        return (
            <section className="h-screen flex flex-col items-center justify-center px-4 py-2">
                <motion.div
                    className="glass p-8 sm:p-12 rounded-3xl text-center max-w-lg mx-4"
                    initial={{ scale: 0, rotate: -10 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12, stiffness: 100 }}
                >
                    {allCorrect ? (
                        <>
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                            >
                                <span className="text-7xl block mb-4">🎉💖✨</span>
                            </motion.div>
                            <motion.h2
                                className="text-3xl sm:text-4xl text-[#E91E63] mb-4"
                                style={{ fontFamily: "var(--font-dancing), cursive" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {feedbackMessages.allCorrect}
                            </motion.h2>
                            <motion.p
                                className="text-xl text-[#FF6B9D] mb-6"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                Score: {score}/{quizQuestions.length} 🏆
                            </motion.p>
                            <motion.button
                                onClick={handleContinue}
                                className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-2xl text-xl shadow-lg"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(233, 30, 99, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Continue to Next Step! 🚀
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.div
                                initial={{ scale: 0, rotate: -20 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            >
                                <span className="text-7xl block mb-4">🥺💕😢</span>
                            </motion.div>
                            <motion.h2
                                className="text-3xl sm:text-4xl text-[#E91E63] mb-4"
                                style={{ fontFamily: "var(--font-dancing), cursive" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                {feedbackMessages.someWrong}
                            </motion.h2>
                            <motion.div
                                className="mb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <p
                                    className="text-xl text-[#FF6B9D] mb-2"
                                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                                >
                                    Score: {score}/{quizQuestions.length}
                                </p>
                                <p
                                    className="text-lg text-[#4A3728]/70"
                                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                                >
                                    Acha se yaad karo aur phir try karo! 🌸
                                </p>
                            </motion.div>

                            <motion.div
                                className="mb-6 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                {answers.map((isAnswerCorrect, idx) => (
                                    <div
                                        key={idx}
                                        className={`text-sm px-3 py-1 rounded-full inline-block mx-1 ${isAnswerCorrect
                                            ? "bg-green-100 text-green-700"
                                            : "bg-red-100 text-red-700"
                                            }`}
                                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                                    >
                                        Q{idx + 1}: {isAnswerCorrect ? "✓" : "✗"}
                                    </div>
                                ))}
                            </motion.div>

                            <motion.button
                                onClick={handleRetry}
                                className="px-8 py-4 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-2xl text-xl shadow-lg"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(233, 30, 99, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Try Again! Dobara Koshish Karo 🌷
                            </motion.button>
                        </>
                    )}
                </motion.div>
            </section>
        );
    }

    return (
        <section className="h-screen flex flex-col items-center justify-center px-4 py-2">
            {/* Special Modal */}
            <AnimatePresence>
                {showSpecialModal && (
                    <motion.div
                        className="fixed inset-0 flex items-center justify-center z-50 bg-black/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleSpecialModalClose}
                    >
                        <motion.div
                            className="bg-gradient-to-br from-white via-pink-50 to-pink-100 p-8 rounded-3xl text-center max-w-sm mx-4 shadow-2xl border-2 border-pink-200"
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 10 }}
                            transition={{ type: "spring", damping: 12 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.span
                                className="text-6xl block mb-4"
                                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 1, repeat: Infinity }}
                            >
                                😏
                            </motion.span>
                            <p
                                className="text-2xl text-[#E91E63] mb-6"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                            >
                                {specialModalMessage}
                            </p>
                            <motion.button
                                onClick={handleSpecialModalClose}
                                className="px-6 py-3 bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] text-white rounded-xl text-lg"
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Hehe, okay! 💕
                            </motion.button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Title */}
            <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl text-center mb-4 text-[#E91E63]"
                style={{ fontFamily: "var(--font-dancing), cursive" }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                How Well Do You Know Us? 💝
            </motion.h2>

            {/* Subtitle */}
            <motion.p
                className="text-lg text-[#FF6B9D] mb-4 text-center"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Get all 3 correct to unlock the next step! ✨
            </motion.p>

            {/* Progress */}
            <motion.div
                className="text-lg text-[#FF6B9D] mb-8"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
            >
                Question {currentQuestion + 1} of {quizQuestions.length}
                {attempts > 0 && (
                    <span className="ml-2 text-sm">(Attempt #{attempts + 1})</span>
                )}
            </motion.div>

            {/* Progress Bar */}
            <div className="w-full max-w-[90vw] sm:max-w-md h-2 bg-white/50 rounded-full mb-6 sm:mb-8 overflow-hidden">
                <motion.div
                    className="h-full bg-gradient-to-r from-[#FF6B9D] to-[#E91E63] rounded-full"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${(currentQuestion / quizQuestions.length) * 100}%`,
                    }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            {/* Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={`${currentQuestion}-${attempts}`}
                    className="w-full max-w-[95vw] sm:max-w-lg glass p-4 sm:p-6 md:p-8 rounded-2xl"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                >
                    {/* Question Text */}
                    <h3
                        className="text-2xl sm:text-3xl text-center text-[#4A3728] mb-8"
                        style={{ fontFamily: "var(--font-caveat), cursive" }}
                    >
                        {question.question}
                    </h3>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {question.options.map((option, index) => {
                            let buttonClass = "w-full p-3 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ";

                            if (showFeedback && selectedAnswer === index) {
                                if (isCorrect) {
                                    buttonClass += "bg-green-100 border-2 border-green-400 text-green-800";
                                } else {
                                    buttonClass += "bg-red-100 border-2 border-red-400 text-red-800 animate-pulse";
                                }
                            } else if (showFeedback && index === quizQuestions[currentQuestion].correct) {
                                buttonClass += "bg-green-100 border-2 border-green-400 text-green-800";
                            } else if (showFeedback) {
                                buttonClass += "bg-white/30 border-2 border-transparent text-[#4A3728]/50";
                            } else {
                                buttonClass += "bg-white/70 border-2 border-transparent hover:border-[#FF6B9D] hover:bg-white text-[#4A3728]";
                            }

                            return (
                                <motion.button
                                    key={index}
                                    onClick={() => handleAnswer(index)}
                                    className={buttonClass}
                                    style={{ fontFamily: "var(--font-caveat), cursive" }}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    whileHover={!showFeedback ? { scale: 1.02 } : {}}
                                    whileTap={!showFeedback ? { scale: 0.98 } : {}}
                                    disabled={showFeedback}
                                >
                                    <span className="text-lg sm:text-xl">
                                        {String.fromCharCode(65 + index)}. {option}
                                    </span>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Feedback Message */}
                    <AnimatePresence>
                        {showFeedback && (
                            <motion.div
                                className={`mt-6 p-4 rounded-xl text-center text-xl ${isCorrect
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                    }`}
                                style={{ fontFamily: "var(--font-caveat), cursive" }}
                                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                {isCorrect ? feedbackMessages.correct : feedbackMessages.wrong}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </AnimatePresence>

            {/* Score Display */}
            <motion.div
                className="mt-6 text-lg text-[#FF6B9D]"
                style={{ fontFamily: "var(--font-caveat), cursive" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
            >
                Score: {score} / {quizQuestions.length} 💕
            </motion.div>
        </section>
    );
}
