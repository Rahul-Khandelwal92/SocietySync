import React from 'react';
import { useMock } from '../context/MockContext';
import { UserRole } from '../types';
import { Building2, Wrench, UserCheck } from 'lucide-react';

const LoginScreen: React.FC = () => {
  const { login } = useMock();

  const handleLogin = (role: UserRole) => {
    login(role);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">SocietySync</h1>
          <p className="text-gray-500">Hyperlocal Community Utility</p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 space-y-4">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Select User Role</p>
          
          <button 
            onClick={() => handleLogin('RESIDENT')}
            className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
          >
            <div className="bg-blue-100 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <Building2 size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-900">Resident</h3>
              <p className="text-sm text-gray-500">Rahul - Flat 101</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin('PROVIDER')}
            className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
          >
            <div className="bg-amber-100 p-3 rounded-full text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <Wrench size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-900">Service Provider</h3>
              <p className="text-sm text-gray-500">Ramesh - Plumber</p>
            </div>
          </button>

          <button 
            onClick={() => handleLogin('ADMIN')}
            className="w-full flex items-center p-4 rounded-xl border border-gray-200 hover:border-primary hover:bg-blue-50 transition-all group"
          >
            <div className="bg-gray-100 p-3 rounded-full text-gray-600 group-hover:bg-gray-800 group-hover:text-white transition-colors">
              <UserCheck size={24} />
            </div>
            <div className="ml-4 text-left">
              <h3 className="font-bold text-gray-900">Admin</h3>
              <p className="text-sm text-gray-500">Secretary</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
