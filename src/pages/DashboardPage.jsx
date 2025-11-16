import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../store/useUserStore";
import CreateUserModal from "../components/Dashboard/CreateUserModal";
import UserList from "../components/Dashboard/UserList";

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { users, addUser, deleteUser } = useUserStore();
  const navigate = useNavigate();

  const handleCreateUser = (name) => {
    addUser(name);
    setShowModal(false);
  };

  const handleEditUser = (userId) => {
    console.log(userId);
    navigate(`/form-builder/${userId}`);
  };

  const handleDeleteUser = (userId) => {
    console.log(userId);
    deleteUser(userId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header - Fully Responsive */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Form Builder Dashboard
            </h1>
            <button
              onClick={() => setShowModal(true)}
              className="w-full sm:w-auto bg-blue-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
            >
              + Create New User
            </button>
          </div>
        </div>
      </header>

      {/* Main Content - Responsive Container */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:py-8 lg:py-12 sm:px-6 lg:px-8">

       

        {/* User List Section - Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          {/* Centered card for medium+ screens, full width on mobile */}
          <div className="lg:col-start-2 lg:col-span-10 xl:col-start-3 xl:col-span-8">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  User Management
                </h2>
                <p className="text-blue-100 text-xs sm:text-sm mt-1">
                  Manage and organize your form users
                </p>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-6 lg:p-8">
                {users.length === 0 ? (
                  <div className="text-center py-12 sm:py-16">
                    <svg
                      className="mx-auto h-12 w-12 sm:h-16 sm:w-16 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-base sm:text-lg font-medium text-gray-900">
                      No users yet
                    </h3>
                    <p className="mt-2 text-sm sm:text-base text-gray-500 px-4">
                      Get started by creating your first user
                    </p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-6 inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 border border-transparent text-sm sm:text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                    >
                      Create First User
                    </button>
                  </div>
                ) : (
                  <UserList
                    users={users}
                    onEdit={handleEditUser}
                    onDelete={handleDeleteUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Create User Modal */}
      {showModal && (
        <CreateUserModal
          onClose={() => setShowModal(false)}
          onCreate={handleCreateUser}
        />
      )}
    </div>
  );
};

export default DashboardPage;
