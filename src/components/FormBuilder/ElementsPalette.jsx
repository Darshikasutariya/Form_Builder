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
      className={`p-4 mb-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-move hover:border-blue-500 hover:bg-blue-50 transition ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{icon}</span>
        <span className="font-medium text-gray-700">{label}</span>
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
    <>
      <div className="bg-white p-6 shadow-md rounded-lg w-full overflow-y-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Form Elements</h3>
        <div>
          {elements.map((element) => (
            <DraggableElement key={element.type} {...element} />
          ))}
        </div>
      </div>
    </>
  );
};

export default ElementsPalette;
