import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker } from '../DateRangePicker';

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
  const [first, setFirst] = useState<any>(undefined);
  const [last, setLast] = useState<any>(undefined);
  const [visible, setVisible] = useState(true);
  function FormatDate(date: Date) {
    return date
      ? `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      : '';
  }
  return (
    <div>
      <input
        readOnly
        value={FormatDate(first)}
        onClick={() => {
          setVisible(true);
        }}
      />
      <input
        readOnly
        value={FormatDate(last)}
        onClick={() => {
          setVisible(true);
        }}
      />
      <div style={{ display: visible ? '' : 'none' }}>
        <DateRangePicker
          first={first}
          last={last}
          limitDate={args.limitDate}
          startDate={args.startDate}
          onFirstDateSelected={(date) => {
            console.log('one');
            setFirst(date);
          }}
          onLastDateSelected={(date) => {
            console.log('two');
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
      </div>
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
