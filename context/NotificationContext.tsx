import { createContext, useContext, useState, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { Platform, Dimensions } from 'react-native';
import { addDays, format, differenceInDays } from 'date-fns';

interface NotificationContextType {
  scheduleFertileWindowNotification: (startDate: Date) => Promise<void>;
  scheduleOvulationNotification: (ovulationDate: Date) => Promise<void>;
  schedulePeriodNotification: (periodDate: Date) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    registerForPushNotificationsAsync();
    configureNotifications();
  }, []);

  async function registerForPushNotificationsAsync() {
    if (Platform.OS === 'web') {
      return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }
  }

  function configureNotifications() {
    if (Platform.OS === 'web') {
      return;
    }

    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async function scheduleFertileWindowNotification(startDate: Date) {
    if (Platform.OS === 'web') {
      return;
    }

    // Cancel existing notifications
    await Notifications.cancelAllScheduledNotificationsAsync();

    // Schedule notifications for 5 days before fertile window
    const notificationDate = addDays(startDate, -5);
    const daysUntilNotification = differenceInDays(notificationDate, new Date());

    if (daysUntilNotification > 0) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Fertile Window Approaching',
          body: 'Your fertile window starts in 5 days. Start tracking your symptoms!',
          data: { type: 'fertile_window' },
        },
        trigger: {
          date: notificationDate,
          repeats: false,
        },
      });

      // Schedule daily reminders leading up to fertile window
      for (let i = 4; i >= 1; i--) {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Fertile Window Reminder',
            body: `Your fertile window starts in ${i} day${i > 1 ? 's' : ''}`,
            data: { type: 'fertile_window_reminder' },
          },
          trigger: {
            date: addDays(startDate, -i),
            repeats: false,
          },
        });
      }
    }
  }

  async function scheduleOvulationNotification(ovulationDate: Date) {
    if (Platform.OS === 'web') {
      return;
    }

    const notificationDate = addDays(ovulationDate, -1);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Ovulation Day Tomorrow',
        body: 'Your predicted ovulation day is tomorrow. This is your most fertile day!',
        data: { type: 'ovulation' },
      },
      trigger: {
        date: notificationDate,
        repeats: false,
      },
    });
  }

  async function schedulePeriodNotification(periodDate: Date) {
    if (Platform.OS === 'web') {
      return;
    }

    const notificationDate = addDays(periodDate, -5);
    
    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Period Starting Soon',
        body: 'Your period is expected to start in 5 days. Make sure you\'re prepared!',
        data: { type: 'period' },
      },
      trigger: {
        date: notificationDate,
        repeats: false,
      },
    });
  }

  return (
    <NotificationContext.Provider 
      value={{ 
        scheduleFertileWindowNotification,
        scheduleOvulationNotification,
        schedulePeriodNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}