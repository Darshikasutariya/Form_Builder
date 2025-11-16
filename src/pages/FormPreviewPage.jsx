import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useBuilderStore from '../store/useBuilderStore';

const FormPreviewPage = () => {

    const { userId } = useParams();
  const navigate = useNavigate();
  const { users } = useUserStore();
  const { elements } = useBuilderStore();
  const [showJson, setShowJson] = useState(false);
  const [formData, setFormData] = useState(null);

  const user = users.find(u => u.id === parseInt(userId));

  const handleSubmit = (data) => {
    setFormData(data);
    setShowJson(true);
  };



  

  const handleClose = () => {
    setShowJson(false);
    setFormData(null);
}
  return (
    <div>
    </div>
  )
}

export default FormPreviewPage
