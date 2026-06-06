import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck } from 'lucide-react';
import {
  useMarkAllNotificationsAsRead,
  useMarkNotificationAsRead,
  useNotifications,
} from '/src/hooks/useAdmin.js';

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { data: notifications = [], isLoading } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  const { mutate: markAllAsRead } = useMarkAllNotificationsAsRead();

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  const handleOpenNotification = (notification) => {
    if (!notification.isRead) {
      markAsRead(notification._id);
    }
    setIsOpen(false);
    if (notification.link) {
      navigate(notification.link);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="relative p-2 text-gray-600 hover:text-primary hover:bg-primary/10 rounded-lg transition-all duration-200"
        title="Notifikasi"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 min-w-5 rounded-full bg-red-600 px-1.5 py-0.5 text-center text-[10px] font-bold text-white">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg z-50">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Notifikasi</p>
              <p className="text-xs text-gray-500">
                {unreadCount} belum dibaca
              </p>
            </div>
            <button
              type="button"
              onClick={() => markAllAsRead()}
              disabled={unreadCount === 0}
              className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-primary hover:bg-primary/10 disabled:text-gray-400 disabled:hover:bg-transparent"
            >
              <CheckCheck className="h-3.5 w-3.5" />
              Baca semua
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {isLoading && (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                Memuat notifikasi...
              </p>
            )}
            {!isLoading && notifications.length === 0 && (
              <p className="px-4 py-6 text-center text-sm text-gray-500">
                Belum ada notifikasi.
              </p>
            )}
            {!isLoading &&
              notifications.map((notification) => (
                <button
                  type="button"
                  key={notification._id}
                  onClick={() => handleOpenNotification(notification)}
                  className={`w-full border-b border-gray-100 px-4 py-3 text-left text-sm transition hover:bg-gray-50 ${
                    notification.isRead ? 'bg-white' : 'bg-primary/5'
                  }`}
                >
                  <p className="font-medium text-gray-900">
                    {notification.message}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(notification.createdAt).toLocaleString('id-ID')}
                  </p>
                </button>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
