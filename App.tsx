import React from 'react';
import { HashRouter } from 'react-router-dom';
import { MockProvider, useMock } from './context/MockContext';
import LoginScreen from './screens/LoginScreen';
import ResidentDashboard from './screens/ResidentDashboard';
import ProviderDashboard from './screens/ProviderDashboard';
import AdminDashboard from './screens/AdminDashboard';
import { LogOut, Home } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentUser, logout } = useMock();

  if (!currentUser) {
    return <LoginScreen />;
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      {/* Top Navigation Bar */}
      <header className="bg-primary text-white shadow-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <div className="bg-white/10 p-2 rounded-lg">
                <Home size={20} className="text-secondary" />
             </div>
             <div>
               <h1 className="text-lg font-bold leading-tight">SocietySync</h1>
               <p className="text-xs text-blue-200">Welcome, {currentUser.name}</p>
             </div>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-block px-3 py-1 bg-white/10 rounded-full text-xs font-medium tracking-wide">
              {currentUser.role.replace('_', ' ')}
            </span>
            <button 
              onClick={logout}
              className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-3 py-2 rounded-lg transition-colors"
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {currentUser.role === 'RESIDENT' && <ResidentDashboard />}
        {currentUser.role === 'PROVIDER' && <ProviderDashboard />}
        {currentUser.role === 'ADMIN' && <AdminDashboard />}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <MockProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </MockProvider>
  );
};

export default App;
