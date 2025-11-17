import React from "react";
import useBuilderStore from "../../store/useBuilderStore";
import { ELEMENT_TYPES } from "../../constants/elementTypes";
import TextInputProperties from "./PropertiesPanel/TextInputProperties";
import CheckboxProperties from "./PropertiesPanel/CheckboxProperties";
import RadioProperties from "./PropertiesPanel/RadioProperties";
import DropdownProperties from "./PropertiesPanel/DropdownProperties";

const PropertiesPanel = () => {
  const { selectedElement, updateElement, removeElement } = useBuilderStore();

  if (!selectedElement) {
    return (
      <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 shadow-sm">
          <h3 className="text-base sm:text-lg font-bold text-gray-900">
            Properties
          </h3>
          <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
            Configure element
          </p>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex flex-col items-center justify-center px-4 py-8 sm:py-12">
          <div className="text-center max-w-xs sm:max-w-sm">
            
            <h4 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
              No Element Selected
            </h4>
            
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Click on an element from the canvas to view and edit its properties
            </p>

            {/* Helper Card */}
            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
              <p className="text-xs sm:text-sm text-blue-800">
                <span className="font-semibold">Tip:</span> Properties will appear here when you select a form element.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property, value) => {
    updateElement(selectedElement.id, { [property]: value });
  };

  const handleRemoveElement = () => {
    if (window.confirm('Are you sure you want to delete this element?')) {
      removeElement(selectedElement.id);
    }
  };

  const renderPropertiesByType = () => {
    const componentProps = {
      element: selectedElement,
      onChange: handlePropertyChange,
    };

    switch (selectedElement.type) {
      case ELEMENT_TYPES.TEXT_INPUT:
        return <TextInputProperties {...componentProps} />;
      case ELEMENT_TYPES.CHECKBOX:
        return <CheckboxProperties {...componentProps} />;
      case ELEMENT_TYPES.RADIO:
        return <RadioProperties {...componentProps} />;
      case ELEMENT_TYPES.DROPDOWN:
        return <DropdownProperties {...componentProps} />;
      default:
        return (
          <div className="text-center py-6 sm:py-8 text-gray-500 text-sm">
            No properties available for this element type
          </div>
        );
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Sticky */}
      <div className="sticky top-0 bg-white z-10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 shadow-sm">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1">
            <h3 className="text-base sm:text-lg font-bold text-gray-900">
              Properties
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              Edit element settings
            </p>
          </div>
          
          <button
            onClick={handleRemoveElement}
            className="
              flex items-center gap-1.5
              px-2.5 sm:px-3 py-1.5 sm:py-2
              bg-red-50 hover:bg-red-100
              text-red-600 hover:text-red-700
              border border-red-200 hover:border-red-300
              rounded-lg
              text-xs sm:text-sm font-medium
              transition-all duration-200
              active:scale-95
            "
          >
            <span className="hidden sm:inline">Delete</span>
            
          </button>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4 space-y-4 sm:space-y-6">
        {/* Element Type Badge */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <p className="text-sm sm:text-base font-bold text-blue-900">
            {selectedElement.label}
          </p>
        </div>

        {/* Element ID (for reference) */}
        <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <p className="text-xs text-gray-600 font-medium mb-1">Element ID</p>
          <p className="text-xs sm:text-sm font-mono text-gray-800 break-all">
            {selectedElement.id}
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 pt-3 sm:pt-4">
          <h4 className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 sm:mb-4">
            Configuration
          </h4>
        </div>

        {/* Dynamic Properties Based on Element Type */}
        <div className="space-y-4 sm:space-y-6">
          {renderPropertiesByType()}
        </div>

        {/* Bottom Padding for scroll */}
        <div className="h-4 sm:h-6"></div>
      </div>

     
    </div>
  );
};

export default PropertiesPanel;
