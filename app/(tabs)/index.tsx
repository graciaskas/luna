import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { format, isSameDay } from 'date-fns';
import { useCycle } from '@/context/CycleContext';
import { useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const isSmallScreen = SCREEN_WIDTH < 375;
const isMediumScreen = SCREEN_WIDTH >= 375 && SCREEN_WIDTH < 414;
const isLargeScreen = SCREEN_WIDTH >= 414;

const getFontScale = () => {
  if (isSmallScreen) return 0.8;
  if (isMediumScreen) return 0.9;
  return 1;
};

const getSpacing = () => {
  if (isSmallScreen) return 12;
  if (isMediumScreen) return 16;
  return 20;
};

export default function HomeScreen() {
  const { cycleData, updateCycleData, getCurrentCycleDay, getFertileWindow, getOvulationDate, getNextPeriod } = useCycle();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState('');
  const { isDark } = useTheme();

  const handleDateSubmit = () => {
    const date = new Date(tempDate);
    if (!isNaN(date.getTime())) {
      updateCycleData({ lastPeriodStart: date });
      setShowDatePicker(false);
    }
  };

  const cycleDay = getCurrentCycleDay();
  const fertileWindow = getFertileWindow();
  const ovulationDate = getOvulationDate();
  const nextPeriod = getNextPeriod();
  const today = new Date();

  const isOvulationDay = ovulationDate && isSameDay(today, ovulationDate);
  const isFertileDay = fertileWindow && today >= fertileWindow.start && today <= fertileWindow.end;

  const getPhaseColor = () => {
    if (cycleDay && cycleDay <= cycleData.periodLength) return '#FF6B81'; // Period
    if (isOvulationDay) return '#FF6B81'; // Ovulation
    if (isFertileDay) return '#90CAF9'; // Fertile
    return '#A8E6CF'; // Non-fertile
  };

  const getPhaseText = () => {
    if (cycleDay && cycleDay <= cycleData.periodLength) return 'Menstrual Phase';
    if (isOvulationDay) return 'Ovulation Day';
    if (isFertileDay) return 'Fertile Window';
    return 'Non-Fertile Phase';
  };

  return (
    <ScrollView style={[styles.container, isDark && styles.containerDark]}>
      <View style={[styles.header, isDark && styles.headerDark]}>
        <Text style={[styles.title, isDark && styles.titleDark]}>Welcome Back!</Text>
        <Text style={[styles.subtitle, isDark && styles.subtitleDark]}>{format(new Date(), 'MMMM d, yyyy')}</Text>
      </View>

      {!cycleData.lastPeriodStart ? (
        <View style={[styles.setupCard, isDark && styles.cardDark]}>
          <Text style={[styles.setupTitle, isDark && styles.titleDark]}>Let's Get Started</Text>
          <Text style={[styles.setupText, isDark && styles.subtitleDark]}>When did your last period start?</Text>
          <TextInput
            style={[styles.dateInput, isDark && styles.dateInputDark]}
            placeholder="YYYY-MM-DD"
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={tempDate}
            onChangeText={setTempDate}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleDateSubmit}>
            <Text style={styles.submitButtonText}>Set Start Date</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={[styles.card, isDark && styles.cardDark]}>
            <Text style={[styles.cardTitle, isDark && styles.titleDark]}>Cycle Day {cycleDay}</Text>
            <Text style={[styles.cardSubtitle, isDark && styles.subtitleDark, isOvulationDay && styles.ovulationText]}>
              {getPhaseText()}
            </Text>
            <View style={styles.phaseIndicator}>
              <View
                style={[
                  styles.phaseBar,
                  { width: `${(cycleDay! / cycleData.cycleLength) * 100}%`, backgroundColor: getPhaseColor() },
                ]}
              />
            </View>
          </View>

          <View style={styles.infoSection}>
            <View style={[styles.infoCard, isDark && styles.cardDark]}>
              <Text style={[styles.infoTitle, isDark && styles.subtitleDark]}>Next Period</Text>
              <Text style={[styles.infoValue, isDark && styles.titleDark]}>
                {nextPeriod ? format(nextPeriod, 'MMM d') : '-'}
              </Text>
            </View>
            <View style={[styles.infoCard, isDark && styles.cardDark]}>
              <Text style={[styles.infoTitle, isDark && styles.subtitleDark]}>Fertile Window</Text>
              <Text style={[styles.infoValue, isDark && styles.titleDark]}>
                {fertileWindow
                  ? `${format(fertileWindow.start, 'MMM d')} - ${format(
                      fertileWindow.end,
                      'MMM d'
                    )}`
                  : '-'}
              </Text>
            </View>
          </View>

          <View style={[styles.phaseCard, isDark && styles.cardDark]}>
            <Text style={[styles.sectionTitle, isDark && styles.titleDark]}>Current Phase</Text>
            <View style={[styles.phaseBadge, { backgroundColor: getPhaseColor() }]}>
              <Text style={styles.phaseBadgeText}>{getPhaseText()}</Text>
            </View>
            {isOvulationDay && (
              <Text style={[styles.ovulationNote, isDark && styles.subtitleDark]}>
                Today is your ovulation day! This is when you're most fertile.
              </Text>
            )}
          </View>

          <View style={styles.symptomsSection}>
            <Text style={[styles.sectionTitle, isDark && styles.titleDark]}>Today's Symptoms</Text>
            <View style={styles.symptomsGrid}>
              {['Cramps', 'Headache', 'Bloating', 'Fatigue'].map((symptom) => (
                <View key={symptom} style={[styles.symptomItem, isDark && styles.cardDark]}>
                  <Text style={[styles.symptomText, isDark && styles.titleDark]}>{symptom}</Text>
                </View>
              ))}
            </View>
          </View>
        </>
      )}
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
    padding: getSpacing(),
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    backgroundColor: '#fff',
  },
  headerDark: {
    backgroundColor: '#2D2D2D',
  },
  title: {
    fontSize: 28 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  titleDark: {
    color: '#fff',
  },
  subtitle: {
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
  subtitleDark: {
    color: '#B0B0B0',
  },
  setupCard: {
    margin: getSpacing(),
    padding: getSpacing(),
    backgroundColor: '#fff',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardDark: {
    backgroundColor: '#2D2D2D',
  },
  setupTitle: {
    fontSize: 24 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 10,
  },
  setupText: {
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginBottom: 20,
  },
  dateInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    marginBottom: 20,
    color: '#1A1A1A',
  },
  dateInputDark: {
    backgroundColor: '#404040',
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#FF6B81',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
  },
  card: {
    margin: getSpacing(),
    padding: getSpacing(),
    backgroundColor: '#fff',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  cardTitle: {
    fontSize: 24 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
  },
  cardSubtitle: {
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    marginTop: 4,
  },
  ovulationText: {
    fontFamily: 'Poppins_700Bold',
    color: '#FF6B81',
  },
  phaseIndicator: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginTop: 15,
  },
  phaseBar: {
    height: 8,
    borderRadius: 4,
  },
  infoSection: {
    flexDirection: isSmallScreen ? 'column' : 'row',
    padding: getSpacing(),
    justifyContent: 'space-between',
  },
  infoCard: {
    flex: isSmallScreen ? undefined : 1,
    backgroundColor: '#fff',
    padding: getSpacing(),
    borderRadius: 12,
    marginHorizontal: isSmallScreen ? 0 : 5,
    marginVertical: isSmallScreen ? getSpacing() / 2 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  infoTitle: {
    fontSize: 14 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
  },
  infoValue: {
    fontSize: 16 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginTop: 4,
  },
  phaseCard: {
    margin: getSpacing(),
    padding: getSpacing(),
    backgroundColor: '#fff',
    borderRadius: 15,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  phaseBadge: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  phaseBadgeText: {
    color: '#fff',
    fontSize: 14 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
  },
  ovulationNote: {
    marginTop: 12,
    fontSize: 14 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#666',
    fontStyle: 'italic',
  },
  symptomsSection: {
    padding: getSpacing(),
  },
  sectionTitle: {
    fontSize: 18 * getFontScale(),
    fontFamily: 'Poppins_600SemiBold',
    color: '#1A1A1A',
    marginBottom: 15,
  },
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -getSpacing() / 4,
  },
  symptomItem: {
    backgroundColor: '#fff',
    padding: getSpacing(),
    borderRadius: 10,
    margin: getSpacing() / 4,
    width: isSmallScreen ? '100%' : '45%',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  symptomText: {
    fontSize: 14 * getFontScale(),
    fontFamily: 'Poppins_400Regular',
    color: '#1A1A1A',
  },
});