import {isMatch, parse} from 'date-fns';

export const dateToString = (date?: Date) => date?.toLocaleDateString('pl-PL', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
});

const SUPPORTED_DATE_FORMATS = ['yyyy-MM-dd', 'dd.MM.yyyy'] as const;

export const stringToDate = (dateString: string) => {
  if (!dateString) {
    return null;
  }
  const matchedFormat = SUPPORTED_DATE_FORMATS.find((format) => isMatch(dateString, format));

  if (matchedFormat) {
    return parse(dateString, matchedFormat, new Date());
  }

  throw new Error(`Unsupported date format: ${dateString}`);
};

// export const stringToDate = (dateString: string) => parse(dateString, 'dd.MM.yyyy', new Date());
