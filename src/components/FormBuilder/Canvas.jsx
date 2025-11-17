import React from "react";
import { useDrop } from "react-dnd";
import useBuilderStore from "../../store/useBuilderStore";
import DroppedElement from "./DroppedElement";

const Canvas = () => {
  const { elements, addElement } = useBuilderStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'FORM_ELEMENT',
    drop: (item) => {
      const newElement = {
        type: item.type,
        label: item.label,
        properties: getDefaultProperties(item.type),
      };
      addElement(newElement);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const getDefaultProperties = (type) => {
    const defaults = {
      'text-input': {
        label: 'Text Input',
        placeholder: 'Enter text',
        name: `field_${Date.now()}`,
        inputType: 'text',
        required: false,
        maxLength: null,
      },
      'checkbox': {
        label: 'Checkbox',
        name: `field_${Date.now()}`,
        checked: false,
        required: false,
        value: 'checked',
      },
      'radio': {
        label: 'Radio Group',
        name: `field_${Date.now()}`,
        options: ['Option 1', 'Option 2'],
        required: false,
      },
      'dropdown': {
        label: 'Dropdown',
        name: `field_${Date.now()}`,
        placeholder: 'Select an option...',
        options: ['Option 1', 'Option 2', 'Option 3'],
        multiple: false,
        required: false,
      },
    };
    return defaults[type] || {};
  };

  return (
    <div className="h-full flex flex-col min-h-[400px] sm:min-h-[500px] lg:min-h-[600px]">
      {/* Drop Zone Area - Responsive */}
      <div
        ref={drop}
        className={`
          flex-1 overflow-y-auto 
          p-3 sm:p-4 md:p-6 lg:p-8
          transition-all duration-300 ease-in-out
          rounded-lg
          ${isOver
            ? 'bg-gradient-to-br from-blue-50 to-indigo-50 border-2 sm:border-3 border-dashed border-blue-500'
            : 'bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300'
          }
        `}
      >
        <div className="space-y-3 sm:space-y-4 lg:space-y-5 max-w-full sm:max-w-3xl lg:max-w-4xl mx-auto">
          {/* Empty State - Minimal Text Only */}
          {!elements.length && (
            <div className="flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] py-8 sm:py-12 lg:py-16 px-4">
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 mb-2 text-center">
                {isOver ? 'Drop element here' : 'Start Building Your Form'}
              </h3>
              
              <p className="text-xs sm:text-sm lg:text-base text-gray-600 text-center max-w-xs sm:max-w-sm lg:max-w-md px-4">
                {isOver 
                  ? 'Release to add this element to your form'
                  : 'Drag form elements from the left panel and drop them here to start building your form'
                }
              </p>
            </div>
          )}

          {/* Form Elements - Responsive Grid */}
          {elements.length > 0 && (
            <div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {/* Element Count Badge */}
              <div className="flex items-center justify-between mb-3 sm:mb-4 pb-3 sm:pb-4 border-b border-gray-300">
                <div className="flex items-center gap-2">
                
                </div>
                
                {isOver && (
                  <span className="text-xs sm:text-sm font-medium text-blue-600">
                    Drop to add
                  </span>
                )}
              </div>

              {/* Dropped Elements List */}
              {elements.map((element, index) => (
                <div key={element.id}>
                  <DroppedElement element={element} index={index} />
                </div>
              ))}

              {/* Drop Area at Bottom when elements exist */}
              {isOver && (
                <div className="border-2 border-dashed border-blue-500 rounded-lg p-4 sm:p-6 bg-blue-50 flex items-center justify-center">
                  <span className="text-sm sm:text-base font-medium text-blue-700">
                    Add element here
                  </span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Canvas;
