 
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Info, 
  X,
  AlertCircle
} from 'lucide-react';
import useToastStore from '/src/store/toastStore.js';

const Toast = ({ toast }) => {
  const { removeToast } = useToastStore();

  const getToastConfig = (type) => {
    const configs = {
      success: {
        icon: CheckCircle,
        bgGradient: 'from-green-50 to-emerald-50',
        borderColor: 'border-green-200',
        iconColor: 'text-green-600',
        titleColor: 'text-green-800',
        messageColor: 'text-green-700',
        progressColor: 'bg-green-500',
        shadowColor: 'shadow-green-100'
      },
      error: {
        icon: XCircle,
        bgGradient: 'from-red-50 to-rose-50',
        borderColor: 'border-red-200',
        iconColor: 'text-red-600',
        titleColor: 'text-red-800',
        messageColor: 'text-red-700',
        progressColor: 'bg-red-500',
        shadowColor: 'shadow-red-100'
      },
      warning: {
        icon: AlertTriangle,
        bgGradient: 'from-yellow-50 to-amber-50',
        borderColor: 'border-yellow-200',
        iconColor: 'text-yellow-600',
        titleColor: 'text-yellow-800',
        messageColor: 'text-yellow-700',
        progressColor: 'bg-yellow-500',
        shadowColor: 'shadow-yellow-100'
      },
      info: {
        icon: Info,
        bgGradient: 'from-blue-50 to-sky-50',
        borderColor: 'border-blue-200',
        iconColor: 'text-blue-600',
        titleColor: 'text-blue-800',
        messageColor: 'text-blue-700',
        progressColor: 'bg-blue-500',
        shadowColor: 'shadow-blue-100'
      },
      confirm: {
        icon: AlertCircle,
        bgGradient: 'from-purple-50 to-pink-50',
        borderColor: 'border-purple-200',
        iconColor: 'text-purple-600',
        titleColor: 'text-purple-800',
        messageColor: 'text-purple-700',
        progressColor: 'bg-purple-500',
        shadowColor: 'shadow-purple-100'
      }
    };
    
    return configs[type] || configs.info;
  };

  const config = getToastConfig(toast.type);
  const Icon = config.icon;

  const handleClose = () => {
    removeToast(toast.id);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.2 } }}
      className={`
        relative max-w-sm w-full bg-gradient-to-r ${config.bgGradient} 
        border ${config.borderColor} rounded-xl shadow-lg ${config.shadowColor} 
        p-4 mb-3 overflow-hidden group hover:shadow-xl transition-all duration-300
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, currentColor 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }}
      />
      
      {/* Main Content */}
      <div className="relative flex items-start space-x-3">
        {/* Icon */}
        <motion.div
          className="flex-shrink-0"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <Icon className={`w-6 h-6 ${config.iconColor}`} />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 min-w-0">
          {toast.title && (
            <motion.h4 
              className={`text-sm font-semibold ${config.titleColor} mb-1`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {toast.title}
            </motion.h4>
          )}
          <motion.p 
            className={`text-sm ${config.messageColor} leading-relaxed`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            {toast.message}
          </motion.p>
        </div>

        {/* Close Button - Always visible for confirm type */}
        <motion.button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleClose();
          }}
          className={`
            flex-shrink-0 p-2 rounded-full hover:bg-white/70 cursor-pointer
            transition-colors duration-200 ${config.iconColor} 
            ${toast.type === 'confirm' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
            border-none outline-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-300
          `}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: toast.type === 'confirm' ? 1 : 0, scale: 1 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          whileTap={{ scale: 0.9 }}
          style={{ pointerEvents: 'auto' }}
        >
          <X className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Progress Bar (for timed toasts) */}
      {toast.duration > 0 && (
        <motion.div
          className={`absolute bottom-0 left-0 h-1 ${config.progressColor} rounded-full`}
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: toast.duration / 1000, ease: "linear" }}
        />
      )}

      {/* Confirm Actions (for confirm type) */}
      {toast.type === 'confirm' && toast.actions && (
        <motion.div 
          className="mt-3 flex space-x-2 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {toast.actions.map((action, index) => (
            <motion.button
              key={index}
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                action.handler();
                handleClose();
              }}
              className={`
                px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer
                border-none outline-none focus:outline-none focus:ring-2 focus:ring-offset-1
                ${action.primary 
                  ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-md hover:from-purple-700 hover:to-pink-700 focus:ring-purple-500' 
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 focus:ring-gray-300'
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ pointerEvents: 'auto' }}
            >
              {action.label}
            </motion.button>
          ))}
        </motion.div>
      )}

      {/* Decorative Elements */}
      <div className={`absolute top-2 right-2 w-2 h-2 ${config.progressColor} rounded-full opacity-20`} />
      <div className={`absolute bottom-2 left-2 w-1 h-1 ${config.progressColor} rounded-full opacity-30`} />
    </motion.div>
  );
};

const ToastContainer = () => {
  const { toasts } = useToastStore();

  return (
    <div className="fixed top-4 right-4 z-[9999] max-w-sm pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <div key={toast.id} className="pointer-events-auto">
            <Toast toast={toast} />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
