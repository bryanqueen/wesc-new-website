import { motion } from 'framer-motion';

interface ButtonProps {
    isActive: boolean;
    toggleMenu: () => void;
}

export default function Button({ isActive, toggleMenu }: ButtonProps) {
  return (
    <div className="lg:hidden border border-white/20 w-24 h-10 cursor-pointer text-white rounded-full overflow-hidden">
      <motion.div
        className="relative w-full h-full "
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <div
          className="w-full h-full flex justify-center items-center hover:perspective-text"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Menu" />
        </div>
        <div
          className="w-full h-full bg-[--primary] flex justify-center items-center hover:perspective-text"
          onClick={toggleMenu}
        >
          <PerspectiveText label="Close" />
        </div>
      </motion.div>
    </div>
  );
}

interface PerspectiveTextProps {
    label: string;
}

function PerspectiveText({ label }: PerspectiveTextProps) {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full transform-style-3d transition-transform duration-700 ease-[cubic-bezier(0.76,0,0.24,1)]">
      <p className="transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] uppercase select-none">
        {label}
      </p>
      <p className="absolute transform origin-bottom-center rotate-x-90 translate-y-2.5 opacity-0 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] uppercase select-none">
        {label}
      </p>
    </div>
  );
}
