"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicToggle from "@/components/MusicToggle";
import LandingSection from "@/components/LandingSection";
import ScrapbookSection from "@/components/ScrapbookSection";
import AppreciationSection from "@/components/AppreciationSection";
import QuizSection from "@/components/QuizSection";
import MiniGameSection from "@/components/MiniGameSection";
import GoldenUnlockSection from "@/components/GoldenUnlockSection";
import ProposalSection from "@/components/ProposalSection";

/*
  💕 VALENTINE'S DAY INTERACTIVE WEBSITE
  
  FLOW:
  1. Landing Section - Welcome & Start Journey
  2. Scrapbook Section - Browse through memories
  3. Quiz Section - Test how well they know you
  4. Mini-Game Section - Navigate the maze
  5. Golden Unlock Section - Dramatic reveal
  6. Proposal Section - The big question!

  🎨 CUSTOMIZATION GUIDE:
  - Photos: Replace images in /public/images/
  - Captions: Edit ScrapbookSection.tsx (look for 📝 CUSTOMIZE comments)
  - Quiz: Edit QuizSection.tsx (look for ❓ CUSTOMIZE comments)  
  - Messages: Edit each section file for custom copy
  - Music: Add your MP3 to /public/music/romantic-bg.mp3
*/

type FlowStep = "landing" | "scrapbook" | "appreciate" | "quiz" | "game" | "unlock" | "proposal";

export default function Home() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("landing");

  const handleLandingComplete = () => {
    setCurrentStep("scrapbook");
  };

  const handleScrapbookComplete = () => {
    setCurrentStep("appreciate");
  };

  const handleAppreciationComplete = () => {
    setCurrentStep("quiz");
  };

  const handleQuizComplete = () => {
    setCurrentStep("game");
  };

  const handleGameComplete = () => {
    setCurrentStep("unlock");
  };

  const handleUnlockComplete = () => {
    setCurrentStep("proposal");
  };

  return (
    <main className="min-h-screen relative overflow-x-hidden">
      {/* Background Music Toggle - Always visible */}
      <MusicToggle />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Floating decorative shapes */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 rounded-full bg-pink-200/30 blur-xl"
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-40 right-10 w-24 h-24 rounded-full bg-rose-200/30 blur-xl"
          animate={{
            y: [0, 20, 0],
            x: [0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/4 w-20 h-20 rounded-full bg-pink-100/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Main Content - Step-by-Step Flow */}
      <AnimatePresence mode="wait">
        {currentStep === "landing" && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6 }}
          >
            <LandingSection onComplete={handleLandingComplete} />
          </motion.div>
        )}

        {currentStep === "scrapbook" && (
          <motion.div
            key="scrapbook"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <ScrapbookSection onComplete={handleScrapbookComplete} />
          </motion.div>
        )}

        {currentStep === "appreciate" && (
          <motion.div
            key="appreciate"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <AppreciationSection onComplete={handleAppreciationComplete} />
          </motion.div>
        )}

        {currentStep === "quiz" && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <QuizSection onComplete={handleQuizComplete} />
          </motion.div>
        )}

        {currentStep === "game" && (
          <motion.div
            key="game"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
          >
            <MiniGameSection onComplete={handleGameComplete} />
          </motion.div>
        )}

        {currentStep === "unlock" && (
          <motion.div
            key="unlock"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <GoldenUnlockSection onComplete={handleUnlockComplete} />
          </motion.div>
        )}

        {currentStep === "proposal" && (
          <motion.div
            key="proposal"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <ProposalSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator (subtle) - hidden on landing */}
      {currentStep !== "landing" && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
          <div className="flex gap-2">
            {(["scrapbook", "quiz", "game", "unlock", "proposal"] as FlowStep[]).map((step, index) => {
              const steps: FlowStep[] = ["scrapbook", "quiz", "game", "unlock", "proposal"];
              const currentIndex = steps.indexOf(currentStep);
              const isCompleted = index < currentIndex;
              const isCurrent = step === currentStep;

              return (
                <motion.div
                  key={step}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${isCompleted
                    ? "bg-[#E91E63]"
                    : isCurrent
                      ? "bg-[#FF6B9D] scale-125"
                      : "bg-white/50"
                    }`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                />
              );
            })}
          </div>
        </div>
      )}
    </main>
  );
}
