import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker } from '../DateRangePicker';

export default {
  title: 'Kidmortal/Datepicker',
  component: DateRangePicker,
  argTypes: {},
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => {
  const [first, setFirst] = useState<any>(undefined);
  const [last, setLast] = useState<any>(undefined);
  const [visible, setVisible] = useState(true);
  const limitDate = new Date('5-01-2022');
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
          limitDate={limitDate}
          onFirstDateSelected={(date) => setFirst(date)}
          onLastDateSelected={(date) => setLast(date)}
          onRequestClose={() => setVisible(false)}
          onSelectionComplete={() => setVisible(false)}
          visible={visible}
          multiple={args.multiple}
          weekdaysName={args.weekdaysName}
          monthsName={args.monthsName}
          customStyles={args.customStyles}
        />
      </div>
    </div>
  );
};

export const SingleCalendar = Template.bind({});
SingleCalendar.args = {
  multiple: false,
};
export const MultpleCalendar = Template.bind({});
MultpleCalendar.args = {
  multiple: true,
};
export const CustomCalendar = Template.bind({});
CustomCalendar.args = {
  multiple: true,
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
