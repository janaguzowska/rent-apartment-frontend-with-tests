import React, {forwardRef} from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled, {createGlobalStyle} from 'styled-components';
import {DateRange} from '../types/DateRange.ts';

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <StyledInput
      {...props}
      ref={ref}
      id="date-picker"
      placeholder="Check-in date - Check-out date"
    />
  )
);

CustomInput.displayName = 'CustomInput';

interface CustomDateRangePickerProps {
  dateRange: DateRange;
  setDateRange: (dateRange: DateRange) => void;
}

const CustomDateRangePicker = (props: CustomDateRangePickerProps) => {
  const {dateRange, setDateRange} = props;
  // const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  // const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  //
  // useEffect(() => {
  //   if (dateRange[0]) {
  //     setStartDate(dateRange[0]);
  //   } else {
  //     setStartDate(undefined);
  //   }
  //
  //   if (dateRange[1]) {
  //     setEndDate(dateRange[1]);
  //   } else {
  //     setEndDate(undefined);
  //   }
  // }, [dateRange]);

  return (
    <>
      <DatePickerGlobalStyles/>
      <DatePicker
        selectsRange // Date range selecting enabled
        // startDate={startDate}
        // endDate={endDate}
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        onChange={(newDateRange) => {
          setDateRange([newDateRange[0] || undefined, newDateRange[1] || undefined]);
        }}
        calendarStartDay={1} // Starts from Monday
        customInput={<CustomInput/>}
        wrapperClassName="custom-datepicker-wrapper"
        autoComplete="off"
      />
    </>
  );
};

export default CustomDateRangePicker;

const StyledInput = styled.input`
  border: none;
  background-color: #f5f5f5;
  height: 100%;
  width: 100%;
  outline: none;

  &:focus {
    outline: none;
    border: none;
  }
`;

const DatePickerGlobalStyles = createGlobalStyle`
  &.react-datepicker-wrapper {
    height: 100%;
    width: 100%;
  }

  &.react-datepicker__input-container {
    height: 100%;
  }
`;
