import React, { useEffect } from 'react';

const SuccessPopup = ({ message, onClose, autoClose = true }) => {
     useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
    <div className="relative bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all animate-slideDown">
        <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Success!
              </h3>
              <p className="text-gray-600">{message}</p>
            </div>
    </div>
    </div>
  )
}

export default SuccessPopup
