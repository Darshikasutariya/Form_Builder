import { create } from "zustand";
import { persist } from "zustand/middleware";

const useFormStore = create(
    persist(
        (set,get)=>({
            forms:{},

            // Save Form for a User
            saveForm : (userId, formData) => {
              const formId = Date.now().toString();
                set((state) => ({
                    forms: {
                        ...state.forms,
                        [userId]: {
                          ...(state.forms[userId] || {}),
                          [formId]:{
                            id:formId,
                            ...formData,
                            savedAt: new Date().toISOString()
                        }
                        },
                        
                    }
                }));
                return formId;
            },


            // Get specific form
      getForm: (userId, formId) => {
        return get().forms[userId]?.[formId];
      },

      //Delete Form
      deleteForm: (userId, formId) => {
        set((state) => {
          const userForms = { ...state.forms[userId] };
          delete userForms[formId];
          return {
            forms: {
              ...state.forms,
              [userId]: userForms
            }
          };
        });
      }
        })
    ),
    {
        name: "form-storage",
    }
)

export default useFormStore;