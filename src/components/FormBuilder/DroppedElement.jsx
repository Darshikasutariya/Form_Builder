import React from "react";
import { useDrag } from "react-dnd";
import useBuilderStore from "../../store/useBuilderStore";
import { ELEMENT_TYPES } from "../../constants/elementTypes";

const DroppedElement = ({ element, index }) => {
  const { selectElement, selectedElement, removeElement, elements } =
    useBuilderStore();

  const currentElement = elements.find((el) => el.id === element.id) || element;

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CANVAS_ELEMENT",
    item: { id: element.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const isSelected = selectedElement?.id === element.id;

  const renderPreview = () => {
    const props = currentElement.properties;

    switch (currentElement.type) {
      case ELEMENT_TYPES.TEXT_INPUT:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {props.label || "Text Input"}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={props.inputType || "text"}
              placeholder={props.placeholder || "Enter text"}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500 cursor-not-allowed"
            />
          </div>
        );

      case ELEMENT_TYPES.CHECKBOX:
        return (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={props.checked || false}
              disabled
              className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-not-allowed"
            />
            <label className="text-sm font-medium text-gray-700">
              {props.label || "Checkbox"}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
          </div>
        );

      case ELEMENT_TYPES.RADIO:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {props.label || "Radio Group"}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="space-y-2">
              {(props.options || []).map((option, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`radio_${currentElement.id}`}
                    disabled
                    className="w-4 h-4 text-blue-600 border-gray-300 cursor-not-allowed"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case ELEMENT_TYPES.DROPDOWN:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {props.label || "Dropdown"}
              {props.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <div className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-50 text-gray-500">
              <div className="flex items-center justify-between">
                <span>{props.placeholder || "Select an option..."}</span>
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {/* Show options list below */}
            {props.options && props.options.length > 0 && (
              <div className="mt-2 p-3 bg-gray-50 rounded border border-gray-200">
                <p className="text-xs font-medium text-gray-500 mb-2">
                  Options:
                </p>
                <ul className="space-y-1">
                  {props.options.map((option, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );

      default:
        return <div className="text-gray-500">Unknown element type</div>;
    }
  };

  return (
    <div
      ref={drag}
      onClick={() => selectElement(element.id)}
      className={`relative p-5 bg-white rounded-lg border-2 transition-all cursor-pointer group ${
        isSelected
          ? "border-blue-500 shadow-lg ring-2 ring-blue-200"
          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
      } ${isDragging ? "opacity-50" : "opacity-100"}`}
    >
      {/* Element Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 cursor-move">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 8h16M4 16h16"
              />
            </svg>
          </span>
          <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
            {currentElement.label}
          </span>
        </div>

        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              selectElement(element.id);
            }}
            className="text-blue-600 hover:text-blue-800 p-1"
            title="Edit"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeElement(element.id);
            }}
            className="text-red-600 hover:text-red-800 p-1"
            title="Delete"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Element Preview - REMOVED pointer-events-none */}
      <div>{renderPreview()}</div>

      {/* Field Name Badge */}
      {currentElement.properties.name && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500">
            Field name:{" "}
            <code className="bg-gray-100 px-2 py-0.5 rounded text-gray-700">
              {currentElement.properties.name}
            </code>
          </span>
        </div>
      )}
    </div>
  );
};

export default DroppedElement;
