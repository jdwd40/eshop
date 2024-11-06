import React from 'react';
import { useStore } from '../store/useStore';
import ProfileForm from '../components/account/ProfileForm';
import PasswordForm from '../components/account/PasswordForm';
import NotificationSettings from '../components/account/NotificationSettings';
import DeleteAccount from '../components/account/DeleteAccount';
import { Settings, Lock, Bell, AlertTriangle } from 'lucide-react';

const tabs = [
  { id: 'profile', label: 'Profile', icon: Settings },
  { id: 'password', label: 'Password', icon: Lock },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

export default function Account() {
  const [activeTab, setActiveTab] = React.useState('profile');
  const { user } = useStore();

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Please sign in</h2>
          <p className="text-gray-600">You need to be logged in to access account settings.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="flex">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 bg-gray-50">
            <nav className="p-4 space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    activeTab === tab.id
                      ? 'bg-indigo-50 text-indigo-600'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && <ProfileForm />}
            {activeTab === 'password' && <PasswordForm />}
            {activeTab === 'notifications' && <NotificationSettings />}
            {activeTab === 'danger' && <DeleteAccount />}
          </div>
        </div>
      </div>
    </div>
  );
}