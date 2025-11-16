import React, { useState } from "react";

const CreateUserModal = ({ onClose, onCreate }) => {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (!name.trim()) {
      alert("Please enter a user name");
      return;
    }
    onCreate(name); // send name to Dashboard
    setName("");
    console.log("User created:", name);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Create User</h2>

        {/* Name Input */}
        <input
          type="text"
          placeholder="Enter user name"
          className="w-full border px-3 py-2 rounded mb-4"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Create
          </button>
        
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;
