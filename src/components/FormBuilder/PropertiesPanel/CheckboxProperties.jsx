import React from 'react';

const CheckboxProperties = ({ element, onChange }) => {
  const props = element.properties;

  return (
    <>
      {/* Label */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Label
        </label>
        <input
          type="text"
          value={props.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Checkbox label"
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

      {/* Default Checked */}
      <div className="flex items-center justify-between p-2.5 sm:p-3 bg-gray-50 rounded-lg">
        <label className="text-xs sm:text-sm font-medium text-gray-700">
          Default Checked
        </label>
        <button
          onClick={() => onChange('checked', !props.checked)}
          className={`relative inline-flex h-5 w-9 sm:h-6 sm:w-11 items-center rounded-full transition-colors ${
            props.checked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-3.5 w-3.5 sm:h-4 sm:w-4 transform rounded-full bg-white transition-transform ${
              props.checked ? 'translate-x-5 sm:translate-x-6' : 'translate-x-0.5 sm:translate-x-1'
            }`}
          />
        </button>
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

      {/* Value */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Value
        </label>
        <input
          type="text"
          value={props.value || ''}
          onChange={(e) => onChange('value', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Checkbox value"
        />
        <p className="mt-1 text-xs text-gray-500">
          Value when checkbox is checked
        </p>
      </div>
    </>
  );
};

export default CheckboxProperties;
