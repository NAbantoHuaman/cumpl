"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Pause } from "lucide-react";
import ReactPlayer from "react-player";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const handleStartMusic = () => {
      setIsPlaying(true);
    };

    window.addEventListener('startMusic', handleStartMusic);
    return () => window.removeEventListener('startMusic', handleStartMusic);
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {isClient && (
        <div className="fixed -top-[1000px] -left-[1000px] opacity-0 pointer-events-none">
          <ReactPlayer
            url="https://www.youtube.com/watch?v=KBf2GPI5hAE"
            playing={isPlaying}
            loop={true}
            volume={0.3}
            onReady={() => setIsReady(true)}
            width="10px"
            height="10px"
            playsinline
            config={{
              youtube: {
                playerVars: { autoplay: 0, modestbranding: 1 }
              }
            }}
          />
        </div>
      )}

      <motion.button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-[100] glass-gold rounded-full px-4 py-3 flex items-center gap-3 cursor-pointer group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 4, duration: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        data-cursor-hover
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {/* Sound bars animation */}
        <div className="flex items-end gap-[2px] h-4">
          {[0, 0.1, 0.2, 0.3].map((delay, i) => (
            <motion.div
              key={i}
              className="w-[3px] rounded-full"
              style={{
                background: "linear-gradient(to top, #FF2D78, #D4A853)",
              }}
              animate={
                isPlaying
                  ? {
                      height: ["4px", "16px", "8px", "14px", "4px"],
                    }
                  : { height: "4px" }
              }
              transition={
                isPlaying
                  ? {
                      duration: 0.8,
                      repeat: Infinity,
                      delay: delay,
                      ease: "easeInOut",
                    }
                  : { duration: 0.3 }
              }
            />
          ))}
        </div>

        <span className="text-pearl-white/80 text-xs tracking-widest uppercase font-light hidden sm:block">
          {isPlaying ? "Pausar" : "Música"}
        </span>

        {/* Icon */}
        <div className="text-gold-soft">
          <AnimatePresence mode="wait">
            {isPlaying ? (
              <motion.div
                key="pause"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Pause className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="play"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <Music className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Glow ring when playing */}
        {isPlaying && (
          <motion.div
            className="absolute inset-0 rounded-full border border-gold-soft/30"
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </>
  );
}
