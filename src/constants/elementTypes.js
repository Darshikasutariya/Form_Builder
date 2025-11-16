export const ELEMENT_TYPES = {
  TEXT_INPUT: "TEXT_INPUT",
  CHECKBOX: "CHECKBOX",
  RADIO: "RADIO",
  DROPDOWN: "DROPDOWN",
};

export const DEFAULT_PROPERTIES = {
  'text-input': {
    label: 'Text Input',
    placeholder: 'Enter text',
    name: '',
    inputType: 'text',
    required: false,
    maxLength: null,
  },
  'checkbox': {
    label: 'Checkbox',
    name: '',
    checked: false,
    required: false,
    value: 'checked',
  },
  'radio': {
    label: 'Radio Group',
    name: '',
    options: ['Option 1', 'Option 2'],
    required: false,
  },
  'dropdown': {
    label: 'Dropdown',
    name: '',
    placeholder: 'Select an option...',
    options: ['Option 1', 'Option 2', 'Option 3'],
    multiple: false,
    required: false,
  },
};

