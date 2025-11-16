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


  return(
    <div className="h-full flex flex-col">
        <div className="bg-white p-4 border-b border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900">Form Canvas</h3>
        <p className="text-sm text-gray-500 mt-1">
          Drag and drop elements to build your form
        </p>
      </div>

      <div ref={drop}  className={`flex-1 overflow-y-auto p-6 transition-colors ${
          isOver
            ? 'bg-blue-50 border-4 border-dashed border-blue-400'
            : 'bg-gray-50 border-4 border-dashed border-gray-200'
        }`}>
            
        <div className="space-y-4 max-w-4xl mx-auto">

            {!elements.length && (
              <div className="text-center text-gray-500">
                Drag form elements here to start building your form.
              </div>
            )}
            {elements.map((element, index) => (
              <DroppedElement
                key={element.id}
                element={element}
                index={index}
              />
            ))}
        </div>
               
      </div>
    </div>
  )
};

export default Canvas;
