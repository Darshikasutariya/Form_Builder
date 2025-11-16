import React, { useState } from "react";

const DropdownProperties = ({ element, onChange }) => {
  const props = element.properties;
  const [newOption, setNewOption] = useState("");

  const handleAddOption = () => {
    if (newOption.trim()) {
      const currentOptions = props.options || [];
      // Create a NEW array to trigger re-render
      const updatedOptions = [...currentOptions, newOption.trim()];
      onChange("options", updatedOptions);
      setNewOption("");
    }
  };

  const handleRemoveOption = (index) => {
    const currentOptions = props.options || [];
    // Create a NEW array to trigger re-render
    const updatedOptions = currentOptions.filter((_, i) => i !== index);
    onChange("options", updatedOptions);
  };

  const handleUpdateOption = (index, value) => {
    // Create a NEW array to trigger re-render
    const currentOptions = [...(props.options || [])];
    currentOptions[index] = value;
    onChange("options", currentOptions);
  };

  return (
    <>
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Label
        </label>
        <input
          type="text"
          value={props.label || ""}
          onChange={(e) => onChange("label", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Dropdown label"
        />
      </div>

      {/* Field Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Field Name
        </label>
        <input
          type="text"
          value={props.name || ""}
          onChange={(e) => onChange("name", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="fieldName"
        />
      </div>

      {/* Placeholder */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Placeholder
        </label>
        <input
          type="text"
          value={props.placeholder || ""}
          onChange={(e) => onChange("placeholder", e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Select an option..."
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Options ({(props.options || []).length})
        </label>

        {/* Existing Options */}
        <div className="space-y-2 mb-3">
          {(props.options || []).map((option, index) => (
            <div key={`${index}-${option}`} className="flex items-center gap-2">
              <span className="text-gray-500 text-sm w-6">{index + 1}.</span>
              <input
                type="text"
                value={option}
                onChange={(e) => handleUpdateOption(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-600 hover:text-red-800 px-2"
                type="button"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add New Option */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddOption();
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            placeholder="Add new option"
          />
          <button
            onClick={handleAddOption}
            type="button"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
          >
            Add
          </button>
        </div>
      </div>

      {/* Multiple Selection */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700">
          Allow Multiple Selection
        </label>
        <button
          type="button"
          onClick={() => onChange("multiple", !props.multiple)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            props.multiple ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              props.multiple ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>

      {/* Required */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700">
          Required Field
        </label>
        <button
          type="button"
          onClick={() => onChange("required", !props.required)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            props.required ? "bg-blue-600" : "bg-gray-300"
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              props.required ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default DropdownProperties;
