import React, { useState } from 'react';
import { Navigation } from '@/components/layout/Navigation';
import { StudentDashboard } from '@/components/student/Dashboard';
import { useAuth } from '@/contexts/AuthContext';

export const MainApp: React.FC = () => {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        if (user?.role === 'student') {
          return <StudentDashboard onPageChange={setCurrentPage} />;
        } else {
          return (
            <div className="max-w-7xl mx-auto p-6">
              <div className="bg-gradient-to-r from-admin to-admin/80 rounded-2xl p-8 text-white shadow-xl">
                <h1 className="text-3xl font-bold mb-2">Administrator Dashboard</h1>
                <p className="text-purple-100">Welcome to the attendance management system</p>
              </div>
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Admin dashboard content will be implemented */}
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Total Students</h3>
                  <p className="text-3xl font-bold text-admin">150</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Present Today</h3>
                  <p className="text-3xl font-bold text-success">142</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h3 className="text-lg font-semibold mb-2">Attendance Rate</h3>
                  <p className="text-3xl font-bold text-primary">94.7%</p>
                </div>
              </div>
            </div>
          );
        }
      
      case 'availability':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Set Availability</h2>
              <p className="text-gray-600 mb-8">Calendar interface for setting monthly availability will be implemented here</p>
              <div className="bg-gray-50 rounded-lg p-8">
                <p className="text-gray-500">Interactive calendar component coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      case 'attendance':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Mark Attendance</h2>
              <p className="text-gray-600 mb-8">Daily attendance marking interface will be implemented here</p>
              <div className="bg-gray-50 rounded-lg p-8">
                <p className="text-gray-500">Time slot selection and attendance marking coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      case 'students':
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Student Management</h2>
              <p className="text-gray-600 mb-8">Student list and management interface will be implemented here</p>
              <div className="bg-gray-50 rounded-lg p-8">
                <p className="text-gray-500">Student management features coming soon...</p>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Page Not Found</h2>
              <p className="text-gray-600">The requested page is not available yet.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main className="py-6">
        {renderPage()}
      </main>
    </div>
  );
};