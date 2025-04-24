import { View, StyleSheet } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { addDays, format } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';

export default function CalendarScreen() {
  const { isDark } = useTheme();
  
  // Mock data - in a real app, this would come from user input and calculations
  const lastPeriodStart = '2024-02-01';
  const ovulationDate = '2024-02-14';
  const fertileStart = '2024-02-09';
  const fertileEnd = '2024-02-15';
  const nextPeriod = '2024-02-28';

  // Generate period days
  const periodDays = {};
  for (let i = 0; i < 5; i++) {
    const date = format(addDays(new Date(lastPeriodStart), i), 'yyyy-MM-dd');
    periodDays[date] = {
      color: '#FF6B81',
      textColor: 'white',
    };
  }

  // Generate fertile window days
  const fertileWindowDays = {};
  const fertileStartDate = new Date(fertileStart);
  const fertileEndDate = new Date(fertileEnd);
  let currentDate = fertileStartDate;
  while (currentDate <= fertileEndDate) {
    const date = format(currentDate, 'yyyy-MM-dd');
    fertileWindowDays[date] = {
      color: '#90CAF9',
      textColor: 'white',
    };
    currentDate = addDays(currentDate, 1);
  }

  const markedDates = {
    ...periodDays,
    ...fertileWindowDays,
    [ovulationDate]: {
      color: '#90CAF9',
      textColor: 'white',
      marked: true,
    },
    [nextPeriod]: {
      startingDay: true,
      color: '#FF6B81',
      textColor: 'white',
    },
  };

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <RNCalendar
        markingType="period"
        markedDates={markedDates}
        theme={{
          backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
          calendarBackground: isDark ? '#1A1A1A' : '#ffffff',
          textSectionTitleColor: isDark ? '#B0B0B0' : '#b6c1cd',
          selectedDayBackgroundColor: '#FF6B81',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#FF6B81',
          dayTextColor: isDark ? '#ffffff' : '#2d4150',
          textDisabledColor: isDark ? '#404040' : '#d9e1e8',
          dotColor: '#FF6B81',
          selectedDotColor: '#ffffff',
          arrowColor: '#FF6B81',
          monthTextColor: isDark ? '#ffffff' : '#2d4150',
          indicatorColor: '#FF6B81',
          textDayFontFamily: 'Poppins_400Regular',
          textMonthFontFamily: 'Poppins_600SemiBold',
          textDayHeaderFontFamily: 'Poppins_400Regular',
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  containerDark: {
    backgroundColor: '#1A1A1A',
  },
});