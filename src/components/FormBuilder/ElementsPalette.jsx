import React from "react";
import { useDrag } from "react-dnd";
import { ELEMENT_TYPES } from "../../constants/elementTypes";
import { PiCursorTextBold } from "react-icons/pi";
import { IoIosCheckboxOutline, IoMdRadioButtonOn } from "react-icons/io";
import { RiDropdownList } from "react-icons/ri";

const DraggableElement = ({ type, label, icon }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "FORM_ELEMENT",
    item: { type, label, icon },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={`
        group relative
        p-3 sm:p-4 mb-2 sm:mb-3
        bg-white border-2 border-gray-200 
        rounded-lg cursor-move 
        hover:border-blue-500 hover:bg-blue-50 
        hover:shadow-md
        active:scale-95
        transition-all duration-200 ease-in-out
        ${isDragging ? "opacity-40 scale-95 shadow-lg" : "opacity-100"}
      `}
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <span className="text-xl sm:text-2xl text-gray-600 group-hover:text-blue-600 transition-colors">
          {icon}
        </span>
        <span className="font-medium text-sm sm:text-base text-gray-700 group-hover:text-gray-900">
          {label}
        </span>
      </div>
      
      {/* Drag Indicator */}
      <div className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-0.5">
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
          <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

const ElementsPalette = () => {
  const elements = [
    {
      type: ELEMENT_TYPES.TEXT_INPUT,
      label: "Text Input",
      icon: <PiCursorTextBold />,
    },
    {
      type: ELEMENT_TYPES.CHECKBOX,
      label: "Checkbox",
      icon: <IoIosCheckboxOutline />,
    },
    {
      type: ELEMENT_TYPES.RADIO,
      label: "Radio Button",
      icon: <IoMdRadioButtonOn />,
    },
    {
      type: ELEMENT_TYPES.DROPDOWN,
      label: "Dropdown",
      icon: <RiDropdownList />,
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
      {/* Header - Sticky on scroll */}
      <div className="sticky top-0 bg-white z-10 px-3 sm:px-4 lg:px-6 py-3 sm:py-4 border-b border-gray-200 shadow-sm">
        <h3 className="text-base sm:text-lg font-bold text-gray-900">
          Form Elements
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1">
          Drag to canvas
        </p>
      </div>

      {/* Elements List - Scrollable */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-4 lg:px-6 py-3 sm:py-4">
        

        {/* Elements Grid */}
        <div className="space-y-2 sm:space-y-3">
          {elements.map((element) => (
            <DraggableElement key={element.type} {...element} />
          ))}
        </div>

        {/* Helper Text */}
        <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs sm:text-sm text-blue-800 leading-relaxed">
            <span className="font-semibold">Tip:</span> Click and hold any element, then drag it to the canvas area to add it to your form.
          </p>
        </div>
      </div>

      
    </div>
  );
};

export default ElementsPalette;
