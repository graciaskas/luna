import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useTheme } from '@/context/ThemeContext';

export default function InsightsScreen() {
  const { isDark } = useTheme();

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity 
        style={[styles.backButton, isDark && styles.backButtonDark]} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Cycle Insights</Text>
      </View>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Cycle Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28</Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Average Cycle</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Period Length</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={[styles.statLabel, isDark && styles.statLabelDark]}>Luteal Phase</Text>
          </View>
        </View>
      </View>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Common Symptoms</Text>
        <View style={styles.symptomsList}>
          {[
            { symptom: 'Cramps', frequency: '80%' },
            { symptom: 'Headache', frequency: '60%' },
            { symptom: 'Bloating', frequency: '75%' },
            { symptom: 'Fatigue', frequency: '85%' },
          ].map((item) => (
            <View key={item.symptom} style={[styles.symptomItem, isDark && styles.symptomItemDark]}>
              <Text style={[styles.symptomText, isDark && styles.symptomTextDark]}>{item.symptom}</Text>
              <Text style={styles.frequencyText}>{item.frequency}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={[styles.card, isDark && styles.cardDark]}>
        <Text style={[styles.cardTitle, isDark && styles.cardTitleDark]}>Cycle Phases</Text>
        <View style={styles.phasesList}>
          {[
            { phase: 'Menstrual', days: '1-5' },
            { phase: 'Follicular', days: '6-13' },
            { phase: 'Ovulation', days: '14' },
            { phase: 'Luteal', days: '15-28' },
          ].map((item) => (
            <View key={item.phase} style={[styles.phaseItem, isDark && styles.phaseItemDark]}>
              <Text style={[styles.phaseText, isDark && styles.phaseTextDark]}>{item.phase}</Text>
              <Text style={[styles.phaseDays, isDark && styles.phaseDaysDark]}>Days {item.days}</Text>
            </View>
          ))}
        </View>
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
  card: {
    margin: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#2D2D2D',
    shadowColor: '#000',
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  cardTitleDark: {
    color: '#fff',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Poppins_700Bold',
    color: '#FF6B81',
  },
  statLabel: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
  statLabelDark: {
    color: '#B0B0B0',
  },
  symptomsList: {
    marginTop: 10,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  symptomItemDark: {
    borderBottomColor: '#404040',
  },
  symptomText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1A1A',
  },
  symptomTextDark: {
    color: '#fff',
  },
  frequencyText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#FF6B81',
  },
  phasesList: {
    marginTop: 10,
  },
  phaseItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  phaseItemDark: {
    borderBottomColor: '#404040',
  },
  phaseText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  phaseTextDark: {
    color: '#fff',
  },
  phaseDays: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
  phaseDaysDark: {
    color: '#B0B0B0',
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