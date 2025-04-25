import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Calendar as RNCalendar } from 'react-native-calendars';
import { addDays, format, isSameDay } from 'date-fns';
import { useTheme } from '@/context/ThemeContext';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useNotifications } from '@/context/NotificationContext';
import { useCycle } from '@/context/CycleContext';
import { useEffect } from 'react';

export default function CalendarScreen() {
  const { isDark } = useTheme();
  const { scheduleFertileWindowNotification, scheduleOvulationNotification, schedulePeriodNotification } = useNotifications();
  const { cycleData, getFertileWindow, getOvulationDate, getNextPeriod } = useCycle();
  
  const lastPeriodStart = cycleData.lastPeriodStart;
  const ovulationDate = getOvulationDate();
  const fertileWindow = getFertileWindow();
  const nextPeriod = getNextPeriod();

  useEffect(() => {
    if (fertileWindow && ovulationDate && nextPeriod) {
      scheduleFertileWindowNotification(fertileWindow.start);
      scheduleOvulationNotification(ovulationDate);
      schedulePeriodNotification(nextPeriod);
    }
  }, [cycleData.lastPeriodStart]);

  // Generate period days
  const periodDays = {};
  if (lastPeriodStart) {
    for (let i = 0; i < cycleData.periodLength; i++) {
      const date = format(addDays(lastPeriodStart, i), 'yyyy-MM-dd');
      periodDays[date] = {
        startingDay: i === 0,
        endingDay: i === cycleData.periodLength - 1,
        color: '#FF6B81',
        textColor: 'white',
      };
    }
  }

  // Generate fertile window days
  const fertileWindowDays = {};
  if (fertileWindow) {
    let currentDate = fertileWindow.start;
    while (currentDate <= fertileWindow.end) {
      const date = format(currentDate, 'yyyy-MM-dd');
      const isFirst = currentDate.getTime() === fertileWindow.start.getTime();
      const isLast = currentDate.getTime() === fertileWindow.end.getTime();
      const isOvulation = ovulationDate && isSameDay(currentDate, ovulationDate);
      
      fertileWindowDays[date] = {
        startingDay: isFirst,
        endingDay: isLast,
        color: '#90CAF9',
        textColor: 'white',
        ...(isOvulation && {
          marked: true,
          dotColor: '#FF6B81',
          customTextStyle: {
            fontFamily: 'Poppins_700Bold',
            fontSize: 16,
          },
        }),
      };
      
      currentDate = addDays(currentDate, 1);
    }
  }

  // Mark next period
  const markedDates = {
    ...periodDays,
    ...fertileWindowDays,
  };

  if (nextPeriod) {
    const nextPeriodStr = format(nextPeriod, 'yyyy-MM-dd');
    markedDates[nextPeriodStr] = {
      startingDay: true,
      color: '#FF6B81',
      textColor: 'white',
    };
  }

  return (
    <View style={[styles.container, isDark && styles.containerDark]}>
      <TouchableOpacity 
        style={[styles.backButton, isDark && styles.backButtonDark]} 
        onPress={() => router.back()}
      >
        <ArrowLeft size={24} color={isDark ? '#fff' : '#1A1A1A'} />
      </TouchableOpacity>

      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6B81' }]} />
          <Text style={[styles.legendText, isDark && styles.legendTextDark]}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#90CAF9' }]} />
          <Text style={[styles.legendText, isDark && styles.legendTextDark]}>Fertile Window</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: '#FF6B81' }]} />
          <Text style={[styles.legendText, isDark && styles.legendTextDark, styles.boldText]}>Ovulation</Text>
        </View>
      </View>

      <RNCalendar
        markingType="period"
        markedDates={markedDates}
        theme={{
          backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
          calendarBackground: isDark ? '#1A1A1A' : '#ffffff',
          textSectionTitleColor: isDark ? '#B0B0B0' : '#666666',
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
          textMonthFontSize: 16,
          textDayFontSize: 14,
          textDayHeaderFontSize: 14,
          'stylesheet.calendar.header': {
            week: {
              marginTop: 5,
              flexDirection: 'row',
              justifyContent: 'space-around',
              paddingHorizontal: 10,
              backgroundColor: isDark ? '#1A1A1A' : '#ffffff',
            },
          },
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
  legend: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
    fontFamily: 'Poppins_400Regular',
  },
  legendTextDark: {
    color: '#B0B0B0',
  },
  boldText: {
    fontFamily: 'Poppins_700Bold',
  },
});