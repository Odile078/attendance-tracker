import React, { useState } from 'react';
import { LoginForm } from '@/components/auth/LoginForm';

export const AuthPage: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <LoginForm onToggleMode={() => setIsLoginMode(!isLoginMode)} />
      </div>
    </div>
  );
};