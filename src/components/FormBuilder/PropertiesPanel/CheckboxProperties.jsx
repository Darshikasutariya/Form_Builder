import React from 'react';

const CheckboxProperties = ({ element, onChange }) => {
  const props = element.properties;

  return (
    <>
      {/* Label */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Label
        </label>
        <input
          type="text"
          value={props.label || ''}
          onChange={(e) => onChange('label', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Checkbox label"
        />
      </div>

      {/* Field Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Field Name
        </label>
        <input
          type="text"
          value={props.name || ''}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="fieldName"
        />
      </div>

      {/* Default Checked */}
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <label className="text-sm font-medium text-gray-700">
          Default Checked
        </label>
        <button
          onClick={() => onChange('checked', !props.checked)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            props.checked ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              props.checked ? 'translate-x-6' : 'translate-x-1'
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
          onClick={() => onChange('required', !props.required)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            props.required ? 'bg-blue-600' : 'bg-gray-300'
          }`}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              props.required ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>

      {/* Value */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Value
        </label>
        <input
          type="text"
          value={props.value || ''}
          onChange={(e) => onChange('value', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
