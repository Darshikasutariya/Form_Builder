import React from 'react'

const TextInputProperties = ({element, onChange}) => {
    const props = element.properties;
  return (
    <>
    {/* label */}
        <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Label
        </label>
        <input 
          type="text" 
          value={props.label} 
          onChange={(e)=>{onChange('label',e.target.value)}} 
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter label" 
        />
        </div>

    {/* placeholder */}
    <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Placeholder
        </label>
        <input
          type="text"
          value={props.placeholder || ''}
          onChange={(e) => onChange('placeholder', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Enter placeholder text"
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
           <p className="mt-1 text-xs text-gray-500">
          Used as the key in form data
        </p>
      </div>
      
       {/* Input Type */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Input Type
        </label>
        <select
          value={props.inputType || 'text'}
          onChange={(e) => onChange('inputType', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="number">Number</option>
          <option value="password">Password</option>
          <option value="tel">Phone</option>
          <option value="url">URL</option>
          <option value="date">Date</option>
        </select>
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
      
      {/* Max Length */}
      <div>
        <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
          Max Length
        </label>
        <input
          type="number"
          value={props.maxLength || ''}
          onChange={(e) => onChange('maxLength', e.target.value)}
          className="w-full px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="No limit"
          min="0"
        />
      </div>
    </>
  )
}

export default TextInputProperties
