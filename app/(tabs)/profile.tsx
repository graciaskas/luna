import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#1A1A1A' : '#F8F9FA',
    },
    header: {
      alignItems: 'center',
      padding: 20,
      paddingTop: 60,
      backgroundColor: isDark ? '#2D2D2D' : '#fff',
    },
    avatar: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 16,
    },
    name: {
      fontSize: 24,
      fontFamily: 'Poppins_600SemiBold',
      color: isDark ? '#fff' : '#1A1A1A',
      marginBottom: 4,
    },
    email: {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: isDark ? '#B0B0B0' : '#666',
    },
    section: {
      backgroundColor: isDark ? '#2D2D2D' : '#fff',
      marginTop: 20,
      padding: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Poppins_600SemiBold',
      color: isDark ? '#fff' : '#1A1A1A',
      marginBottom: 12,
    },
    stat: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#404040' : '#f0f0f0',
    },
    statLabel: {
      fontSize: 16,
      fontFamily: 'Poppins_400Regular',
      color: isDark ? '#B0B0B0' : '#666',
    },
    statValue: {
      fontSize: 16,
      fontFamily: 'Poppins_600SemiBold',
      color: isDark ? '#fff' : '#1A1A1A',
    },
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&auto=format&fit=crop&q=80' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cycle Statistics</Text>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Cycle Length</Text>
          <Text style={styles.statValue}>28 days</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Period Length</Text>
          <Text style={styles.statValue}>5 days</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Tracked Cycles</Text>
          <Text style={styles.statValue}>12</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Health Insights</Text>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Most Common Symptom</Text>
          <Text style={styles.statValue}>Cramps</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statLabel}>Average Cycle Regularity</Text>
          <Text style={styles.statValue}>Regular</Text>
        </View>
      </View>
    </ScrollView>
  );
}