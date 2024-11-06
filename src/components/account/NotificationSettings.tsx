import React from 'react';
import { useStore } from '../../store/useStore';

const notificationTypes = [
  {
    id: 'orders',
    title: 'Order Updates',
    description: 'Get notified about your order status changes',
    email: true,
    push: true,
  },
  {
    id: 'promotions',
    title: 'Promotions',
    description: 'Receive updates about sales and special offers',
    email: true,
    push: false,
  },
  {
    id: 'security',
    title: 'Security Alerts',
    description: 'Get important notifications about your account security',
    email: true,
    push: true,
  },
  {
    id: 'newsletter',
    title: 'Newsletter',
    description: 'Weekly digest of new products and features',
    email: false,
    push: false,
  },
];

export default function NotificationSettings() {
  const [settings, setSettings] = React.useState(notificationTypes);
  const [isSaving, setIsSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const handleToggle = (id: string, type: 'email' | 'push') => {
    setSettings(prev =>
      prev.map(setting =>
        setting.id === id
          ? { ...setting, [type]: !setting[type] }
          : setting
      )
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSuccess(false);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (error) {
      console.error('Failed to save notification settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className="flex items-start justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900">
                {setting.title}
              </h4>
              <p className="text-sm text-gray-500">{setting.description}</p>
            </div>
            <div className="flex items-center space-x-4 ml-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting.email}
                  onChange={() => handleToggle(setting.id, 'email')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={setting.push}
                  onChange={() => handleToggle(setting.id, 'push')}
                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-600">Push</span>
              </label>
            </div>
          </div>
        ))}
      </div>

      {success && (
        <div className="bg-green-50 text-green-600 px-4 py-3 rounded-lg">
          Notification preferences updated successfully!
        </div>
      )}

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors disabled:bg-indigo-400"
        >
          {isSaving ? 'Saving...' : 'Save Preferences'}
        </button>
      </div>
    </div>
  );
}