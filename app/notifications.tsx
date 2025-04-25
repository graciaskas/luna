import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft, Bell } from 'lucide-react-native';
import { router } from 'expo-router';

export default function NotificationsScreen() {
  const { isDark } = useTheme();

  const notifications = [
    {
      id: 1,
      title: 'Fertile Window Approaching',
      message: 'Your fertile window starts in 3 days',
      date: '2024-02-08',
      read: false,
    },
    {
      id: 2,
      title: 'Ovulation Day',
      message: 'Tomorrow is your predicted ovulation day',
      date: '2024-02-13',
      read: true,
    },
    {
      id: 3,
      title: 'Period Tracker',
      message: 'Your period is expected to start in 5 days',
      date: '2024-02-23',
      read: false,
    },
  ];

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity 
        style={[styles.backButton, isDark && styles.backButtonDark]} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Notifications</Text>
      </View>

      <View style={styles.notificationList}>
        {notifications.map((notification) => (
          <View 
            key={notification.id} 
            style={[
              styles.notificationItem,
              isDark && styles.notificationItemDark,
              !notification.read && styles.unreadNotification,
            ]}
          >
            <View style={styles.notificationIcon}>
              <Bell size={24} color="#FF6B81" />
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, isDark && styles.notificationTitleDark]}>
                {notification.title}
              </Text>
              <Text style={[styles.notificationMessage, isDark && styles.notificationMessageDark]}>
                {notification.message}
              </Text>
              <Text style={[styles.notificationDate, isDark && styles.notificationDateDark]}>
                {notification.date}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  containerDark: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  headerDark: {
    backgroundColor: '#2D2D2D',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  titleDark: {
    color: '#fff',
  },
  notificationList: {
    padding: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItemDark: {
    backgroundColor: '#2D2D2D',
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B81',
  },
  notificationIcon: {
    marginRight: 15,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  notificationTitleDark: {
    color: '#fff',
  },
  notificationMessage: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 8,
  },
  notificationMessageDark: {
    color: '#B0B0B0',
  },
  notificationDate: {
    fontSize: 12,
    fontFamily: 'Poppins_400Regular',
    color: '#999',
  },
  notificationDateDark: {
    color: '#808080',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  backButtonDark: {
    backgroundColor: '#404040',
  },
});