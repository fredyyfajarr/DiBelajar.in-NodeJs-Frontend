// src/pages/SettingsPage.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Bell, Moon, Sun } from 'lucide-react';

// Komponen Toggle Switch statis
const ToggleSwitch = ({ label, description, enabled }) => (
  <div className="flex items-center justify-between py-4 border-b border-gray-200">
    <div>
      <p className="font-medium text-gray-800">{label}</p>
      <p className="text-sm text-gray-500">{description}</p>
    </div>
    <div
      className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
        enabled ? 'bg-purple-600' : 'bg-gray-300'
      }`}
    >
      <motion.div
        layout
        className="w-4 h-4 bg-white rounded-full shadow-md"
        transition={{ type: 'spring', stiffness: 700, damping: 30 }}
        style={{ marginLeft: enabled ? 'auto' : '0' }}
      />
    </div>
  </div>
);

const SettingsPage = () => {
  // Data statis untuk UI
  const settingsData = {
    theme: 'theme-purple', // 'theme-purple' atau 'theme-green'
    mode: 'light', // 'light' atau 'dark'
    notifications: {
      newCourses: true,
      forumReplies: true,
      weeklySummary: false,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Pengaturan</h1>

      {/* Pengaturan Tampilan */}
      <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Palette className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-gray-800">Tampilan</h2>
        </div>

        <div className="space-y-6">
          {/* Pilihan Tema */}
          <div>
            <p className="font-medium text-gray-800 mb-2">Tema Warna</p>
            <div className="flex gap-4">
              <div
                className={`p-2 border-2 ${
                  settingsData.theme === 'theme-purple'
                    ? 'border-purple-600'
                    : 'border-transparent'
                } rounded-lg cursor-pointer`}
              >
                <div className="w-16 h-10 bg-purple-600 rounded-md"></div>
                <p className="text-sm text-center mt-1">Ungu</p>
              </div>
              <div
                className={`p-2 border-2 ${
                  settingsData.theme === 'theme-green'
                    ? 'border-purple-600'
                    : 'border-transparent'
                } rounded-lg cursor-pointer`}
              >
                <div className="w-16 h-10 bg-green-700 rounded-md"></div>
                <p className="text-sm text-center mt-1">Hijau</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferensi Notifikasi */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center gap-4 mb-6">
          <Bell className="w-8 h-8 text-pink-600" />
          <h2 className="text-2xl font-bold text-gray-800">
            Preferensi Notifikasi
          </h2>
        </div>

        <div>
          <ToggleSwitch
            label="Kursus Baru"
            description="Dapatkan email saat ada kursus baru yang relevan."
            enabled={settingsData.notifications.newCourses}
          />
          <ToggleSwitch
            label="Balasan Forum"
            description="Beri tahu saya jika ada balasan di forum diskusi."
            enabled={settingsData.notifications.forumReplies}
          />
          <ToggleSwitch
            label="Ringkasan Mingguan"
            description="Kirim ringkasan aktivitas belajar saya setiap minggu."
            enabled={settingsData.notifications.weeklySummary}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;
