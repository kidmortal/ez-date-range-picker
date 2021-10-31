import React, { useState } from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DateRangePicker } from '../DateRangePicker';

const Container = styled.div``;

const View = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: lightgray;
`;

export default {
  title: 'Kidmortal/Datepicker',
  component: DateRangePicker,
  argTypes: {},
} as ComponentMeta<typeof DateRangePicker>;

const Template: ComponentStory<typeof DateRangePicker> = (args) => {
  const [first, setFirst] = useState<any>(undefined);
  const [last, setLast] = useState<any>(undefined);
  const startDate = new Date();
  const limitDate = new Date('5-01-2022');
  return (
    <DateRangePicker
      first={first}
      last={last}
      startDate={startDate}
      limitDate={limitDate}
      onFirstDateSelected={(date) => setFirst(date)}
      onLastDateSelected={(date) => setLast(date)}
      onRequestClose={() => alert('Requested Close')}
      onSelectionComplete={() => alert('Completed Selecting')}
      visible
    />
  );
};

export const Desktop = Template.bind({});
Desktop.args = {};
