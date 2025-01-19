import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoaderComponent = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLoadingComplete();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
    >
      <motion.div 
        className="flex items-center justify-center space-x-3 px-4 sm:space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Globe SVG */}
        <motion.svg
          width="80"
          height="80"
          viewBox="0 0 400 400"
          className="shrink-0"
        >
          {/* Circle Border */}
          <motion.circle
            cx="200"
            cy="200"
            r="180"
            fill="none"
            stroke="#008080"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Globe */}
          <motion.g
            animate={{ 
              rotate: 360 
            }}
            transition={{ 
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            style={{ transformOrigin: '200px 200px' }}
          >
            <circle cx="200" cy="200" r="150" fill="none" stroke="#008080" strokeWidth="2"/>
            {/* Latitude lines */}
            {[-60, -30, 0, 30, 60].map((angle, i) => (
              <path
                key={`lat-${i}`}
                d={`M50,200 A150,${150 * Math.cos(angle * Math.PI / 180)} 0 0 1 350,200`}
                fill="none"
                stroke="#008080"
                strokeWidth="1"
                transform={`translate(0,${angle})`}
              />
            ))}
            {/* Longitude lines */}
            {[0, 45, 90, 135].map((angle, i) => (
              <line
                key={`lon-${i}`}
                x1="200"
                y1="50"
                x2="200"
                y2="350"
                stroke="#008080"
                strokeWidth="1"
                transform={`rotate(${angle} 200 200)`}
              />
            ))}
          </motion.g>
        </motion.svg>

        {/* Text Container */}
        <div>
          <motion.div 
            className="text-3xl sm:text-4xl font-bold text-[--primary]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            {/* Split text animation for WESC */}
            {'WESC'.split('').map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 1.8 + (i * 0.1) }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.div
            className="text-sm sm:text-base text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            {/* Split text animation for full name */}
            {'World Education Service Center'.split(' ').map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 2.5 + (i * 0.1) }}
                className="inline-block mr-1 sm:mr-2"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoaderComponent;