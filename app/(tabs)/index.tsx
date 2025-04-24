import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { format, addDays } from 'date-fns';

export default function HomeScreen() {
  // Mock data - in a real app, this would come from user input and calculations
  const cycleLength = 28;
  const lastPeriodStart = new Date(2024, 1, 1);
  const ovulationDate = addDays(lastPeriodStart, 14);
  const nextPeriodDate = addDays(lastPeriodStart, cycleLength);
  const fertileWindowStart = addDays(ovulationDate, -5);
  const fertileWindowEnd = addDays(ovulationDate, 1);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>{format(new Date(), 'MMMM d, yyyy')}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Cycle Day {14}</Text>
        <Text style={styles.cardSubtitle}>Ovulation Phase</Text>
        <View style={styles.phaseIndicator}>
          <View style={[styles.phaseBar, { backgroundColor: '#FF6B81' }]} />
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Next Period</Text>
          <Text style={styles.infoValue}>{format(nextPeriodDate, 'MMM d')}</Text>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Fertile Window</Text>
          <Text style={styles.infoValue}>
            {format(fertileWindowStart, 'MMM d')} - {format(fertileWindowEnd, 'MMM d')}
          </Text>
        </View>
      </View>

      <View style={styles.symptomsSection}>
        <Text style={styles.sectionTitle}>Today's Symptoms</Text>
        <View style={styles.symptomsGrid}>
          {['Cramps', 'Headache', 'Bloating', 'Fatigue'].map((symptom) => (
            <View key={symptom} style={styles.symptomItem}>
              <Text style={styles.symptomText}>{symptom}</Text>
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
  subtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
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
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  cardSubtitle: {
    fontSize: 16,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
  phaseIndicator: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 15,
  },
  phaseBar: {
    width: '50%',
    height: 8,
    borderRadius: 4,
  },
  infoSection: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  symptomsSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  symptomItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    margin: 5,
    minWidth: '45%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  symptomText: {
    fontSize: 14,
    fontFamily: 'Poppins_400Regular',
    color: '#1A1A1A',
  },
});