import { create } from 'zustand';
import { AppNotification, mockNotifications } from '../mocks/mockNotifications';

interface NotificationState {
  notifications: AppNotification[];
  unreadCount: number;
  initializeNotifications: () => void;
  markAsRead: (notificationId: string) => void;
  markAllAsRead: () => void;
  markAllRead: () => void; // alias for markAllAsRead
  addNotification: (notification: AppNotification) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: [],
  unreadCount: 0,
  initializeNotifications: () => {
    set({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter((n) => !n.isRead).length,
    });
  },
  markAsRead: (notificationId) => {
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === notificationId ? { ...n, isRead: true } : n
      );
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    });
  },
  markAllAsRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
      return {
        notifications: updated,
        unreadCount: 0,
      };
    });
  },
  markAllRead: () => {
    set((state) => {
      const updated = state.notifications.map((n) => ({ ...n, isRead: true }));
      return { notifications: updated, unreadCount: 0 };
    });
  },
  addNotification: (notification) => {
    set((state) => {
      const updated = [notification, ...state.notifications];
      return {
        notifications: updated,
        unreadCount: updated.filter((n) => !n.isRead).length,
      };
    });
  },
}));
