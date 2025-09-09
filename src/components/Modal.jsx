/* eslint-disable no-unused-vars */
// src/components/Modal.jsx
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Modal = ({ isOpen, onClose, children, size = 'md', showCloseButton = true, className = '' }) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scroll
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Size variants - optimized for desktop width
  const sizeClasses = {
    xs: 'max-w-sm',
    sm: 'max-w-lg',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    '2xl': 'max-w-7xl',
    full: 'max-w-[95vw]'
  };

  // Animation variants
  const backdropVariants = {
    hidden: { 
      opacity: 0,
      backdropFilter: 'blur(0px)'
    },
    visible: { 
      opacity: 1,
      backdropFilter: 'blur(8px)',
      transition: {
        duration: 0.3,
        ease: 'easeOut'
      }
    },
    exit: { 
      opacity: 0,
      backdropFilter: 'blur(0px)',
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50,
      rotateX: -15
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        mass: 0.9
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.9,
      y: -20,
      transition: {
        duration: 0.2,
        ease: 'easeIn'
      }
    }
  };

  const closeButtonVariants = {
    rest: { scale: 1, rotate: 0 },
    hover: { 
      scale: 1.1, 
      rotate: 90,
      transition: {
        duration: 0.2,
        ease: 'easeInOut'
      }
    },
    tap: { scale: 0.95 }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50 mt-10 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/70 to-black/60 backdrop-blur-sm"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
            style={{ 
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%)'
            }}
          />

          {/* Modal Container */}
          <div className="flex min-h-full items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              className={`
                relative w-full ${sizeClasses[size]} 
                bg-white/95 backdrop-blur-xl
                rounded-3xl shadow-2xl 
                border border-white/20
                ${className}
              `}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `
                  0 25px 50px -12px rgba(0, 0, 0, 0.25),
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 1px 0 rgba(255, 255, 255, 0.2)
                `,
              }}
            >
              {/* Decorative Elements */}
              <div className="absolute -top-1 -left-1 w-72 h-72 bg-gradient-to-br from-indigo-400/10 via-purple-400/5 to-pink-400/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-1 -right-1 w-72 h-72 bg-gradient-to-tl from-blue-400/10 via-cyan-400/5 to-teal-400/10 rounded-full blur-3xl -z-10" />

              {/* Close Button */}
              {showCloseButton && (
                <motion.button
                  onClick={onClose}
                  className="absolute -top-2 -right-2 z-20 w-10 h-10 
                           bg-white/90 backdrop-blur-sm
                           border border-gray-200/50
                           rounded-full shadow-lg
                           flex items-center justify-center
                           text-gray-500 hover:text-gray-700
                           hover:bg-white hover:shadow-xl
                           focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                           transition-colors duration-200"
                  variants={closeButtonVariants}
                  initial="rest"
                  whileHover="hover"
                  whileTap="tap"
                  aria-label="Close modal"
                >
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </motion.button>
              )}

              {/* Content Wrapper with Glassmorphism */}
              <div className="relative overflow-hidden rounded-3xl">
                {/* Subtle Inner Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/20 to-white/10 pointer-events-none" />
                
                {/* Main Content */}
                <div className="relative z-10">
                  {children}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

// Enhanced Modal Header Component
export const ModalHeader = ({ children, className = '' }) => (
  <div className={`
    px-6 sm:px-8 py-6 
    border-b border-gray-200/30
    bg-gradient-to-r from-gray-50/50 to-white/30
    backdrop-blur-sm
    ${className}
  `}>
    <div className="flex items-center justify-between">
      {typeof children === 'string' ? (
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
          {children}
        </h2>
      ) : (
        children
      )}
    </div>
  </div>
);

// Enhanced Modal Body Component
export const ModalBody = ({ children, className = '' }) => (
  <div className={`px-6 sm:px-8 py-6 ${className}`}>
    {children}
  </div>
);

// Enhanced Modal Footer Component
export const ModalFooter = ({ children, className = '' }) => (
  <div className={`
    px-6 sm:px-8 py-4 
    border-t border-gray-200/30
    bg-gradient-to-r from-gray-50/30 to-white/20
    backdrop-blur-sm
    rounded-b-3xl
    ${className}
  `}>
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:justify-end">
      {children}
    </div>
  </div>
);

// Enhanced Button Components for Modal
export const ModalButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base'
  };

  const variantClasses = {
    primary: `
      bg-gradient-to-r from-indigo-600 to-purple-600 text-white 
      hover:from-indigo-700 hover:to-purple-700 
      hover:shadow-lg hover:shadow-indigo-500/25 
      focus:ring-indigo-500
      transform hover:-translate-y-0.5
    `,
    secondary: `
      bg-white/80 backdrop-blur-sm text-gray-700 border border-gray-300
      hover:bg-gray-50 hover:shadow-md
      focus:ring-gray-500
    `,
    danger: `
      bg-gradient-to-r from-red-600 to-pink-600 text-white
      hover:from-red-700 hover:to-pink-700
      hover:shadow-lg hover:shadow-red-500/25
      focus:ring-red-500
      transform hover:-translate-y-0.5
    `,
    ghost: `
      text-gray-600 hover:text-gray-900 hover:bg-gray-100/80
      focus:ring-gray-500
    `
  };

  return (
    <motion.button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      whileHover={{ scale: variant !== 'ghost' ? 1.02 : 1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Modal;