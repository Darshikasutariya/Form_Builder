import { create } from "zustand";

const useBuilderStore = create((set, get) => ({
  elements: [],
  selectedElement: null,

  addElement: (element) => {
    const newElement = {
      ...element,
      id: Date.now(),
      properties: element.defaultProperties || {},
    };
    set((state) => ({
      elements: [...state.elements, newElement],
    }));
  },

  // FIXED: Update element properties and ensure selectedElement is updated
  updateElement: (elementId, newProperties) => {
    set((state) => {
      const updatedElements = state.elements.map((el) =>
        el.id === elementId
          ? {
              ...el,
              properties: { ...el.properties, ...newProperties },
            }
          : el
      );

      // Update selectedElement if it's the one being modified
      const updatedSelectedElement =
        state.selectedElement?.id === elementId
          ? updatedElements.find((el) => el.id === elementId)
          : state.selectedElement;

      return {
        elements: updatedElements,
        selectedElement: updatedSelectedElement,
      };
    });
  },

  selectElement: (elementId) => {
    const element = get().elements.find((el) => el.id === elementId);
    set({ selectedElement: element ? { ...element } : null });
  },

  removeElement: (elementId) => {
    set((state) => ({
      elements: state.elements.filter((el) => el.id !== elementId),
      selectedElement:
        state.selectedElement?.id === elementId ? null : state.selectedElement,
    }));
  },

  clearCanvas: () => {
    set({ elements: [], selectedElement: null });
  },

  // Optional: Reorder elements for drag-and-drop
  reorderElements: (startIndex, endIndex) => {
    set((state) => {
      const result = Array.from(state.elements);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return { elements: result };
    });
  },
}));

export default useBuilderStore;
