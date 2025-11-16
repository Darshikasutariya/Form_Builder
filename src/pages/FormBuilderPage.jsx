import React,{use, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import ElementsPalette from '../components/FormBuilder/ElementsPalette'
import Canvas from '../components/FormBuilder/Canvas'
import useUserStore from '../store/useUserStore'
import useBuilderStore from '../store/useBuilderStore'
import  useFormStore from '../store/useFormStore'
import PropertiesPanel from '../components/FormBuilder/PropertiesPanel';
import { FaArrowLeft } from "react-icons/fa6";



const FormBuilderPage = () => {
    const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { saveForm} = useFormStore();
  const { elements, clearCanvas } = useBuilderStore();
  const [showSuccess, setShowSuccess] = useState(false);

  const user = users.find(u => u.id === parseInt(userId));

    const handleSaveForm = () => {
    const formData = {
      name: `${user.name}'s_Form_${Date.now()}`,
      elements: elements,
    };
    const formId = saveForm(parseInt(userId), formData);
    setShowSuccess(true);
  };

const handlePreview = () => {
    navigate(`/preview/${userId}`);
  };



  return (
    <>
    <div className="min-h-screen bg-gray-50 flex flex-col">
        <header className="bg-white shadow-sm">
            <div className="max-w-full mx-auto px-4 py-4 flex justify-between items-center">
                <button className="text-gray-600 hover:text-gray-900" onClick={() => navigate('/')}>  <FaArrowLeft size={24} width={24} color="#0000ff" /> </button>
                <h2 className="text-xl font-semibold text-gray-900">
                     {user?.name} Form Builder
                </h2>
                <div className="flex gap-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"  onClick={handlePreview}>
                        Preview
                    </button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={handleSaveForm}>
                        Save Form
                    </button>
                </div>
            </div>
        </header>

        <div className="flex-1 flex overflow-hidden">

            <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
               {/* ElementsPalette */}
               <ElementsPalette />
            </div>

            <div className='flex-1 p-6 overflow-y-auto'>
                {/* FormCanvas */}
                <Canvas/>
            </div>

            <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
                {/* PropertiesPanel */}
                <PropertiesPanel/>
            </div>
        </div>


    </div>
    </>
  )
}

export default FormBuilderPage
