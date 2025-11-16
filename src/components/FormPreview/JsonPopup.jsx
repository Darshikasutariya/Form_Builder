import React from "react";

const JsonPopup = ({ data, onClose }) => {
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      ></div>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative bg-white rounded-xl shadow-2xl max-w-3xl w-full mx-auto transform transition-all">
          <h3 className="text-2xl font-bold text-white flex items-center gap-2">
            Form Submitted Successfully!
          </h3>
          <p className="text-green-100 text-sm mt-1">
            Here's your form data in JSON format
          </p>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition"
          >
            &#10005;
          </button>
        </div>
      </div>
      {/* content */}
      <div className="p-6">
        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
          <pre className="text-green-400 text-sm font-mono">
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
        
      </div>
    </div>
  );
};

export default JsonPopup;
