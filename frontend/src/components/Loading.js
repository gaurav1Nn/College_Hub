import React from "react";
import startFrame from '../assets/StartFrame.png'; // Import the image
import { motion } from "framer-motion";

const Loading = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-subtle"
    >
      <div className="relative flex flex-col items-center">
        {/* Elegant glow effect behind logo */}
        <motion.div
          className="absolute rounded-full bg-accent/20 filter blur-xl"
          initial={{ width: 100, height: 100, opacity: 0.3 }}
          animate={{ 
            width: [100, 300, 200], 
            height: [100, 300, 200], 
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
        
        {/* Main image with refined animation */}
        <motion.div className="relative z-10 mb-20">
          <motion.img
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1,
              opacity: 1
            }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            src={startFrame}
            alt="College Hub"
            className="w-72 h-auto"
          />
          
          {/* Subtle pulse effect on the image */}
          <motion.div
            className="absolute inset-0 bg-accent/10 rounded-xl z-0"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0],
              scale: [0.95, 1.02, 0.95]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
      
      {/* Loading spinner and text with refined animation */}
      <motion.div 
        className="flex flex-col items-center mt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
      >
        <div className="relative">
          {/* Elegant spinner */}
          <div className="w-12 h-12 relative">
            <motion.div 
              className="absolute inset-0 border-t-2 border-accent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-0 border-t-2 border-r-2 border-accent/30 rounded-full"
              animate={{ rotate: -180 }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          {/* Center dot */}
          <motion.div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-accent rounded-full"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        
        {/* Text */}
        <motion.p 
          className="mt-4 text-text-primary/90 text-sm font-medium tracking-wider"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          LOADING
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >...</motion.span>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default Loading;
