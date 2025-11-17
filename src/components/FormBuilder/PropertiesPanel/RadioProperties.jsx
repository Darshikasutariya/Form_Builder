import React, { useState } from 'react';

const RadioProperties = ({ element, onChange }) => {
  const props = element.properties;
  const [newOption, setNewOption] = useState('');

  const handleAddOption = () => {
    if (newOption.trim()) {
      const currentOptions = props.options || [];
      onChange('options', [...currentOptions, newOption.trim()]);
      setNewOption('');
    }
  };

  const handleRemoveOption = (index) => {
    const currentOptions = props.options || [];
    onChange('options', currentOptions.filter((_, i) => i !== index));
  };

  const handleUpdateOption = (index, value) => {
    const currentOptions = [...props.options];
    currentOptions[index] = value;
    onChange('options', currentOptions);
  };

  return (
    <>
      {/* Label */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Group Label
        </label>
        <input
          type="text"
          value={props.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Radio group label"
        />
      </div>

      {/* Field Name */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Field Name
        </label>
        <input
          type="text"
          value={props.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="fieldName"
        />
      </div>

      {/* Options */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Options
        </label>
        
        {/* Existing Options */}
        <div className="space-y-1.5 sm:space-y-2 mb-2 sm:mb-3">
          {(props.options || []).map((option, index) => (
            <div key={index} className="flex items-center gap-1.5 sm:gap-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleUpdateOption(index, e.target.value)}
                className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
              />
              <button
                onClick={() => handleRemoveOption(index)}
                className="text-red-600 hover:text-red-800 px-1.5 sm:px-2 text-sm sm:text-base"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Add New Option */}
        <div className="flex gap-1.5 sm:gap-2">
          <input
            type="text"
            value={newOption}
            onChange={(e) => setNewOption(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddOption()}
            className="flex-1 px-2.5 sm:px-3 py-1.5 sm:py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xs sm:text-sm"
            placeholder="Add new option"
          />
          <button
            onClick={handleAddOption}
            className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-xs sm:text-sm font-medium whitespace-nowrap"
          >
            Add
          </button>
        </div>
      </div>

      {/* Required */}
      <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg">
        <label className="text-xs sm:text-sm font-medium text-gray-700">
          Required Field
        </label>
        <button
          onClick={() => onChange('required', !props.required)}
          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
            props.required ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
              props.required ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5 sm:translate-x-1'
            }`}
          />
        </button>
      </div>
    </>
  );
};

export default RadioProperties;
