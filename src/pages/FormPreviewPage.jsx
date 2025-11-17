import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useBuilderStore from '../store/useBuilderStore';
import FormRenderer from '../components/FormPreview/FormRenderer';
import JsonPopup from '../components/FormPreview/JsonPopup';

const FormPreviewPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { elements } = useBuilderStore();
  const [showJson, setShowJson] = useState(false);
  const [formData, setFormData] = useState(null);

  const user = users.find((u) => u.id === parseInt(userId));

  const handleSubmit = (data) => {
    setFormData(data);
    setShowJson(true);
  };

  const handleClose = () => {
    setShowJson(false);
    setFormData(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(`/form-builder/${userId}`)}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-2 transition"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Builder
              </button>
              <div className="h-6 w-px bg-gray-300"></div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Form Preview
                </h1>
                <p className="text-sm text-gray-500">User: {user?.name}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Form Header */}
          <div  className="bg-blue-600 p-6 sm:p-8 md:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              {user?.name}'s Form
            </h2>
            <p className="text-blue-100">
              Please fill out all the required fields and submit the form
            </p>
          </div>

          {/* Form Content */}
          <div className="p-6 sm:p-8 md:p-10">
            {elements.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  No Form Elements
                </h3>
                <p className="text-gray-500 mb-6">
                  This form doesn't have any elements yet. Go back to the
                  builder to add elements.
                </p>
                <button
                  onClick={() => navigate(`/form-builder/${userId}`)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Builder
                </button>
              </div>
            ) : (
              <FormRenderer elements={elements} onSubmit={handleSubmit} />
            )}
          </div>
        </div>
      </main>

      {/* JSON Popup */}
      {showJson && (
        <JsonPopup
          data={formData}
          onClose={handleClose}
        />
      )}
    </div>
  );
};

export default FormPreviewPage;
