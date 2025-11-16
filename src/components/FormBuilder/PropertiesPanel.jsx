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
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Properties
        </h3>
        <div className="text-center py-12">
          <div className="text-gray-400 text-5xl mb-4">⚙️</div>
          <p className="text-gray-500">
            Select an element from the canvas to edit its properties
          </p>
        </div>
      </div>
    );
  }

  const handlePropertyChange = (property, value) => {
    updateElement(selectedElement.id, { [property]: value });
  };

  const handleRemoveElement = () => {
    removeElement(selectedElement.id);
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
        return <div className="text-gray-500">No properties available</div>;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Properties</h3>
        <button
          onClick={handleRemoveElement}
          className="text-red-600 hover:text-red-800 text-sm font-medium"
        >
          Delete Element
        </button>
      </div>

      {/* Element Type Badge */}
      <div className="mb-6 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-600 font-medium uppercase tracking-wide mb-1">
          Element Type
        </p>
        <p className="text-sm font-semibold text-blue-900">
          {selectedElement.label}
        </p>
      </div>

      {/* Dynamic Properties Based on Element Type */}
      <div className="space-y-6">
        {renderPropertiesByType()}
      </div>
    </div>
  );
};

export default PropertiesPanel;
