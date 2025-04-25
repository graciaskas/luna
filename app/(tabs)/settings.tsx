import { View, Text, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { Bell, Lock, Moon, Sun, User, LogOut, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { router } from 'expo-router';

export default function SettingsScreen() {
  const { user, signOut } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1A1A1A' : '#F8F9FA',
    },
    header: {
      padding: 20,
      paddingTop: 60,
      backgroundColor: isDark ? '#2D2D2D' : '#fff',
    },
    title: {
      fontSize: 28,
      fontFamily: 'Poppins_600SemiBold',
      color: isDark ? '#fff' : '#1A1A1A',
    },
    section: {
      backgroundColor: isDark ? '#2D2D2D' : '#fff',
      marginTop: 20,
      paddingHorizontal: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontFamily: 'Poppins_600SemiBold',
      color: isDark ? '#B0B0B0' : '#666',
      marginVertical: 10,
    },
    settingItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#404040' : '#f0f0f0',
    },
    settingLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    settingText: {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: isDark ? '#fff' : '#1A1A1A',
      marginLeft: 15,
    },
    logoutButton: {
      margin: 20,
      padding: 15,
      backgroundColor: '#FF6B81',
      borderRadius: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
    },
    logoutIcon: {
      marginRight: 8,
    },
    logoutText: {
      color: '#fff',
      fontSize: 16,
      fontFamily: 'Poppins_600SemiBold',
    },
    backButton: {
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 1,
      padding: 8,
      borderRadius: 20,
      backgroundColor: isDark ? '#404040' : '#f0f0f0',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <User size={24} color={isDark ? '#fff' : '#1A1A1A'} />
            <Text style={styles.settingText}>{user?.name || 'Profile'}</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Lock size={24} color={isDark ? '#fff' : '#1A1A1A'} />
            <Text style={styles.settingText}>Privacy</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            <Bell size={24} color={isDark ? '#fff' : '#1A1A1A'} />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: isDark ? '#404040' : '#767577', true: '#FF6B81' }}
            thumbColor="#fff"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingLeft}>
            {isDark ? (
              <Sun size={24} color="#fff" />
            ) : (
              <Moon size={24} color="#1A1A1A" />
            )}
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            trackColor={{ false: isDark ? '#404040' : '#767577', true: '#FF6B81' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cycle Settings</Text>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Cycle Length: 28 days</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>Period Length: 5 days</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <LogOut size={20} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}