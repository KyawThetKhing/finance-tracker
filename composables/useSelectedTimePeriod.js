import {
  startOfYear,
  startOfMonth,
  startOfWeek,
  startOfDay,
  sub,
  endOfYear,
  endOfMonth,
  endOfDay,
  endOfWeek,
} from 'date-fns';

export const useSelectedTimePeriod = (period) => {
  console.log(
    '🚀 ~ useSelectedTimePeriod.js:14 ~ useSelectedTimePeriod ~ period:',
    period.value
  );
  const current = computed(() => {
    switch (period.value) {
      case 'Yearly':
        return {
          from: startOfYear(new Date()),
          to: new Date(),
        };
      case 'Monthly':
        return {
          from: startOfMonth(new Date()),
          to: new Date(),
        };
      case 'Weekly':
        return {
          from: startOfWeek(new Date()),
          to: new Date(),
        };
      case 'Daily':
        return {
          from: startOfDay(new Date()),
          to: endOfDay(new Date()),
        };
    }
  });

  const previous = computed(() => {
    switch (period.value) {
      case 'Yearly':
        const previousYear = sub(new Date(), { years: 1 });
        return {
          from: startOfYear(previousYear),
          to: endOfYear(previousYear),
        };
      case 'Monthly':
        const previousMonth = sub(new Date(), { months: 1 });
        return {
          from: startOfMonth(previousMonth),
          to: endOfMonth(previousMonth),
        };
      case 'Weekly':
        const previousWeek = sub(new Date(), { weeks: 1 });
        return {
          from: startOfWeek(previousWeek),
          to: endOfWeek(previousWeek),
        };
      case 'Daily':
        const previousDay = sub(new Date(), { days: 1 });
        return {
          from: startOfDay(previousDay),
          to: endOfDay(previousDay),
        };
    }
  });
  console.log(
    '🚀 ~ useSelectedTimePeriod.js:73 ~ useSelectedTimePeriod ~ current, previous:',
    current,
    previous
  );
  return { current, previous };
};
