import { createContext, useContext, useState } from 'react';
import { addDays } from 'date-fns';

interface CycleData {
  lastPeriodStart: Date | null;
  cycleLength: number;
  periodLength: number;
}

interface CycleContextType {
  cycleData: CycleData;
  updateCycleData: (data: Partial<CycleData>) => void;
  getFertileWindow: () => { start: Date; end: Date } | null;
  getOvulationDate: () => Date | null;
  getNextPeriod: () => Date | null;
  getCurrentCycleDay: () => number | null;
}

const CycleContext = createContext<CycleContextType | undefined>(undefined);

export function CycleProvider({ children }: { children: React.ReactNode }) {
  const [cycleData, setCycleData] = useState<CycleData>({
    lastPeriodStart: null,
    cycleLength: 28,
    periodLength: 5,
  });

  const updateCycleData = (data: Partial<CycleData>) => {
    setCycleData(prev => ({ ...prev, ...data }));
  };

  const getOvulationDate = () => {
    if (!cycleData.lastPeriodStart) return null;
    return addDays(cycleData.lastPeriodStart, 14);
  };

  const getFertileWindow = () => {
    const ovulationDate = getOvulationDate();
    if (!ovulationDate) return null;

    return {
      start: addDays(ovulationDate, -5),
      end: addDays(ovulationDate, 1),
    };
  };

  const getNextPeriod = () => {
    if (!cycleData.lastPeriodStart) return null;
    return addDays(cycleData.lastPeriodStart, cycleData.cycleLength);
  };

  const getCurrentCycleDay = () => {
    if (!cycleData.lastPeriodStart) return null;
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - cycleData.lastPeriodStart.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <CycleContext.Provider
      value={{
        cycleData,
        updateCycleData,
        getFertileWindow,
        getOvulationDate,
        getNextPeriod,
        getCurrentCycleDay,
      }}
    >
      {children}
    </CycleContext.Provider>
  );
}

export function useCycle() {
  const context = useContext(CycleContext);
  if (context === undefined) {
    throw new Error('useCycle must be used within a CycleProvider');
  }
  return context;
}