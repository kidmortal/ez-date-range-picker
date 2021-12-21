import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker, DateRangePickerSelecting } from '../DateRangePicker';

export default {
  title: 'Kidmortal/Datepicker',
  component: DateRangePicker,
  argTypes: {
    singleDate: {
      control: { type: 'boolean' },
    },
  },
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => {
  const [selecting, setSelecting] = useState<DateRangePickerSelecting | undefined>('first');
  const [first, setFirst] = useState<any>(undefined);
  const [last, setLast] = useState<any>(undefined);
  const [visible, setVisible] = useState(true);
  function FormatDate(date: Date) {
    return date ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}` : '';
  }
  return (
    <div>
      <input
        readOnly
        value={FormatDate(first)}
        onClick={() => {
          setVisible(true);
          setSelecting('first');
        }}
      />
      <input
        readOnly
        value={FormatDate(last)}
        onClick={() => {
          setVisible(true);
          setSelecting('last');
        }}
      />
      {visible && (
        <DateRangePicker
          first={first}
          last={last}
          isSelecting={selecting}
          limitDate={args.limitDate}
          startDate={args.startDate}
          onFirstDateSelected={(date) => {
            setFirst(date);
            setSelecting('last');
          }}
          onLastDateSelected={(date) => {
            setLast(date);
          }}
          onSelectionComplete={() => {
            setVisible(false);
          }}
          visible={visible}
          multiple={args.multiple}
          weekdaysName={args.weekdaysName}
          monthsName={args.monthsName}
          customStyles={args.customStyles}
          singleDate={args.singleDate}
        />
      )}
    </div>
  );
};

export const SingleCalendar = Template.bind({});
SingleCalendar.args = {
  multiple: false,
  startDate: new Date(),
  limitDate: new Date(2023, 5, 10),
  singleDate: true,
};
export const MultpleCalendar = Template.bind({});
MultpleCalendar.args = {
  multiple: true,
  startDate: new Date(),
  limitDate: new Date(2023, 5, 10),
  singleDate: false,
};
export const CustomCalendar = Template.bind({});
CustomCalendar.args = {
  multiple: true,
  startDate: new Date(),
  limitDate: new Date(2023, 5, 10),
  singleDate: false,
  weekdaysName: ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'],
  monthsName: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  customStyles: {
    HeaderContainer: {
      backgroundColor: '#e63ecfcf',
    },
    HeaderButton: { color: 'blue' },
    HeaderYear: {
      color: '#4bee36dd',
    },
    ColorPallet: {
      backgroundColor: {
        firstSelected: '#4bee36dd',
        lastSelected: '#e63ecfcf',
        between: '#ee367344',
      },
    },
  },
};
