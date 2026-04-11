import {
  DateTimePicker,
  DateTimePickerChangeEvent,
} from '@progress/kendo-react-dateinputs';
import {
  CompositeFilterDescriptor,
  FilterDescriptor,
  State,
} from '@progress/kendo-data-query';

interface DateRangeFilterCellProps {
  setDataState: (dataState: State) => void;
  dataState: State;
  field: string;
}

export const DateRangeFilterCell = (props: DateRangeFilterCellProps) => {
  const { setDataState, dataState, field } = props;

  const hasValue = (value: any) => Boolean(value && value !== '');

  const onChangeFrom = (event: DateTimePickerChangeEvent) => {
    const value = event.value;
    const filters =
      (dataState.filter as CompositeFilterDescriptor)?.filters || [];

    const newFilters = filters.filter((f) => {
      const fd = f as FilterDescriptor;
      return !(fd.field === field && fd.operator === 'gte');
    });

    if (hasValue(value)) {
      newFilters.push({
        field: field,
        operator: 'gte',
        value: value,
      } as FilterDescriptor);
    }

    setDataState({
      ...dataState,
      filter: {
        logic: 'and',
        filters: newFilters,
      },
    });
  };

  const onChangeTo = (event: DateTimePickerChangeEvent) => {
    const value = event.value;
    const filters =
      (dataState.filter as CompositeFilterDescriptor)?.filters || [];

    const newFilters = filters.filter((f) => {
      const fd = f as FilterDescriptor;
      return !(fd.field === field && fd.operator === 'lte');
    });

    if (hasValue(value)) {
      newFilters.push({
        field: field,
        operator: 'lte',
        value: value,
      } as FilterDescriptor);
    }

    setDataState({
      ...dataState,
      filter: {
        logic: 'and',
        filters: newFilters,
      },
    });
  };

  const filters =
    (dataState.filter as CompositeFilterDescriptor)?.filters || [];
  const fromFilter = filters.find((f) => {
    const fd = f as FilterDescriptor;
    return fd.field === field && fd.operator === 'gte';
  }) as FilterDescriptor;

  const toFilter = filters.find((f) => {
    const fd = f as FilterDescriptor;
    return fd.field === field && fd.operator === 'lte';
  }) as FilterDescriptor;

  return (
    <div
      style={{
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <div>
        <label
          style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}
        >
          Data od:
        </label>
        <DateTimePicker
          value={fromFilter?.value as Date | undefined}
          onChange={onChangeFrom}
          format="dd.MM.yyyy HH:mm"
          formatPlaceholder="formatPattern"
          width="100%"
        />
      </div>
      <div>
        <label
          style={{ fontSize: '12px', display: 'block', marginBottom: '4px' }}
        >
          Data do:
        </label>
        <DateTimePicker
          value={toFilter?.value as Date | undefined}
          onChange={onChangeTo}
          format="dd.MM.yyyy HH:mm"
          formatPlaceholder="formatPattern"
          width="100%"
        />
      </div>
    </div>
  );
};
