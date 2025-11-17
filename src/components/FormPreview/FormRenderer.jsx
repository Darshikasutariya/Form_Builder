import React, { useState } from 'react';
import { ELEMENT_TYPES } from '../../constants/elementTypes';

const FormRenderer = ({ elements, onSubmit }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
    
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    elements.forEach((element) => {
      const props = element.properties;
      const fieldName = props.name;
      const value = formData[fieldName];

      if (props.required) {
        if (!value || (Array.isArray(value) && value.length === 0)) {
          newErrors[fieldName] = `${props.label} is required`;
        }
      }
    });
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(formData);
  };

  const renderElement = (element) => {
    const props = element.properties;
    const fieldName = props.name;
    const error = errors[fieldName];

    switch (element.type) {
      case ELEMENT_TYPES.TEXT_INPUT:
        return (
          <div key={element.id} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {props.label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={props.inputType || 'text'}
              name={fieldName}
              placeholder={props.placeholder}
              maxLength={props.maxLength}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                error
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            />
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        );

      case ELEMENT_TYPES.CHECKBOX:
        return (
          <div key={element.id} className="mb-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                name={fieldName}
                checked={formData[fieldName] || false}
                onChange={(e) => handleChange(fieldName, e.target.checked)}
                className="mt-1 w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex-1">
                <label className="block text-sm font-semibold text-gray-700">
                  {props.label}
                  {props.required && (
                    <span className="text-red-500 ml-1">*</span>
                  )}
                </label>
              </div>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        );

      case ELEMENT_TYPES.RADIO:
        return (
          <div key={element.id} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              {props.label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-3">
              {(props.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <input
                    type="radio"
                    name={fieldName}
                    value={option}
                    checked={formData[fieldName] === option}
                    onChange={(e) => handleChange(fieldName, e.target.value)}
                    className="w-5 h-5 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                  />
                  <label className="text-sm text-gray-700">{option}</label>
                </div>
              ))}
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        );

      case ELEMENT_TYPES.DROPDOWN:
        return (
          <div key={element.id} className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              {props.label}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              name={fieldName}
              value={formData[fieldName] || ''}
              onChange={(e) => handleChange(fieldName, e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition ${
                error
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-300 bg-white'
              }`}
            >
              <option value="">
                {props.placeholder || 'Select an option...'}
              </option>
              {(props.options || []).map((option, idx) => (
                <option key={idx} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-1">
      {elements.map((element) => renderElement(element))}

      {/* Submit Button */}
      <div className="pt-6 border-t border-gray-200">
        <button
          type="submit"
          className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition transform hover:scale-105 shadow-lg"
        >
          Submit Form
        </button>
      </div>
    </form>
  );
};

export default FormRenderer;
