import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ElementsPalette from '../components/FormBuilder/ElementsPalette';
import Canvas from '../components/FormBuilder/Canvas';
import useUserStore from '../store/useUserStore';
import useBuilderStore from '../store/useBuilderStore';
import useFormStore from '../store/useFormStore';
import PropertiesPanel from '../components/FormBuilder/PropertiesPanel';
import { FaArrowLeft, FaBars, FaTimes } from "react-icons/fa";
import { MdViewSidebar } from "react-icons/md";

const FormBuilderPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { saveForm } = useFormStore();
  const { elements, clearCanvas } = useBuilderStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);



  const user = users.find(u => u.id === parseInt(userId));

  const handleSaveForm = () => {
    const formData = {
      name: `${user.name}'s_Form_${Date.now()}`,
      elements: elements,
    };
    const formId = saveForm(parseInt(userId), formData);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handlePreview = () => {
    navigate(`/preview/${userId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Header - Fully Responsive */}
      <header className="bg-white shadow-md sticky top-0 z-30">
        <div className="max-w-full mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex justify-between items-center gap-2">
            {/* Left Side - Back Button & Toggle */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                onClick={() => navigate('/')}
                aria-label="Go back"
              >
                <FaArrowLeft size={20} className="sm:w-6 sm:h-6" />
              </button>
              
              {/* Mobile: Elements Palette Toggle */}
              <button
                className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
                aria-label="Toggle elements palette"
              >
                <FaBars size={20} />
              </button>
            </div>

            {/* Center - Title (hidden on small mobile) */}
            <h2 className="hidden sm:block text-base sm:text-lg lg:text-xl font-semibold text-gray-900 truncate">
              {user?.name}'s Form Builder
            </h2>
            <h2 className="sm:hidden text-sm font-semibold text-gray-900 truncate max-w-[120px]">
              {user?.name}
            </h2>

            {/* Right Side - Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Mobile: Properties Toggle */}
              <button
                className="xl:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
                aria-label="Toggle properties"
              >
                <MdViewSidebar size={20} />
              </button>
              
              <button
                className="bg-green-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-green-700 active:scale-95 transition-all text-xs sm:text-sm font-medium shadow-md"
                onClick={handlePreview}
              >
                Preview
              </button>
              <button
                className="bg-blue-600 text-white px-3 py-2 sm:px-4 sm:py-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all text-xs sm:text-sm font-medium shadow-md"
                onClick={handleSaveForm}

              >
                Save
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Success Toast */}
      {/* Success Modal Popup */}
{showSuccess && (

  //bottom right side show only when success is true*/}
 <div className="fixed bottom-5 right-5 z-50 bg-gray-700 text-white px-4 py-2 rounded-lg">
    <p className="text-white text-sm sm:text-base font-bold">Form Saved Successfully!</p>
  </div>
)}


      {/* Main Content Area - Three Column Responsive Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Sidebar - Elements Palette */}
        {/* Desktop: Always visible, Mobile: Overlay drawer */}
        <aside
          className={`
            fixed lg:relative inset-y-0 left-0 z-40
            w-64 sm:w-72 lg:w-64 xl:w-80
            bg-white border-r border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            lg:translate-x-0
            overflow-y-auto
            mt-[57px] sm:mt-[65px] lg:mt-0
          `}
        >
          <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200 flex justify-between items-center lg:py-4">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Elements Palette</h3>
            <button
              className="lg:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setLeftSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="p-3 sm:p-4">
            <ElementsPalette />
          </div>
        </aside>

        {/* Mobile Overlay for Left Sidebar */}
        {leftSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden mt-[57px] sm:mt-[65px]"
            onClick={() => setLeftSidebarOpen(false)}
          />
        )}

        {/* Center - Canvas Area */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-3 sm:p-4 lg:p-6 xl:p-8">
            <div className="max-w-5xl mx-auto">
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                    Form Canvas
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Drag and drop elements to build your form
                  </p>
                </div>
                <Canvas />
              </div>
            </div>
          </div>
        </main>

        {/* Right Sidebar - Properties Panel */}
        {/* Desktop (xl): Always visible, Tablet/Mobile: Overlay drawer */}
        <aside
          className={`
            fixed xl:relative inset-y-0 right-0 z-40
            w-80 sm:w-96 xl:w-80 2xl:w-96
            bg-white border-l border-gray-200
            transform transition-transform duration-300 ease-in-out
            ${rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
            xl:translate-x-0
            overflow-y-auto
            mt-[57px] sm:mt-[65px] xl:mt-0
          `}
        >
          <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-gray-200 flex justify-between items-center xl:py-4">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Properties Panel</h3>
            <button
              className="xl:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setRightSidebarOpen(false)}
            >
              <FaTimes size={20} />
            </button>
          </div>
          <div className="p-3 sm:p-4">
            <PropertiesPanel />
          </div>
        </aside>

        {/* Mobile Overlay for Right Sidebar */}
        {rightSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 xl:hidden mt-[57px] sm:mt-[65px]"
            onClick={() => setRightSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default FormBuilderPage;
