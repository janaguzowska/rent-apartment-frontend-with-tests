import React, {forwardRef, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input
      {...props}
      ref={ref}
      id="date-picker"
      placeholder="Check-in date - Check-out date"
    />
  )
);

CustomInput.displayName = 'CustomInput';

const CustomDateRangePicker: React.FC = () => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    if (dateRange[0]) {
      setStartDate(dateRange[0]);
    } else {
      setStartDate(undefined);
    }

    if (dateRange[1]) {
      setEndDate(dateRange[1]);
    } else {
      setEndDate(undefined);
    }
  }, [dateRange]);

  return (
    <DatePicker
      selectsRange // Date range selecting enabled
      startDate={startDate}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      calendarStartDay={1} // Starts from Monday
      customInput={<CustomInput />}
    />
  );
};

export default CustomDateRangePicker;
