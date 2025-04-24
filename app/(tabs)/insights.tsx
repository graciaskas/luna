import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function InsightsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Cycle Insights</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cycle Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>28</Text>
            <Text style={styles.statLabel}>Average Cycle</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Period Length</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>14</Text>
            <Text style={styles.statLabel}>Luteal Phase</Text>
          </View>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Common Symptoms</Text>
        <View style={styles.symptomsList}>
          {[
            { symptom: 'Cramps', frequency: '80%' },
            { symptom: 'Headache', frequency: '60%' },
            { symptom: 'Bloating', frequency: '75%' },
            { symptom: 'Fatigue', frequency: '85%' },
          ].map((item) => (
            <View key={item.symptom} style={styles.symptomItem}>
              <Text style={styles.symptomText}>{item.symptom}</Text>
              <Text style={styles.frequencyText}>{item.frequency}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cycle Phases</Text>
        <View style={styles.phasesList}>
          {[
            { phase: 'Menstrual', days: '1-5' },
            { phase: 'Follicular', days: '6-13' },
            { phase: 'Ovulation', days: '14' },
            { phase: 'Luteal', days: '15-28' },
          ].map((item) => (
            <View key={item.phase} style={styles.phaseItem}>
              <Text style={styles.phaseText}>{item.phase}</Text>
              <Text style={styles.phaseDays}>Days {item.days}</Text>
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
  header: {
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
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
  cardTitle: {
    fontSize: 20,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 15,
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
  symptomText: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1A1A',
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
  phaseText: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  phaseDays: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
});