import { parse } from 'date-fns';

export const dateToString = (date: Date) => date.toLocaleDateString('pl-PL', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

export const stringToDate = (dateString: string) => parse(dateString, 'dd.MM.yyyy', new Date());
