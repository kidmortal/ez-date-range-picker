import React, { useState } from 'react';
import styled from 'styled-components';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker } from '../src';

const Container = styled.div`
  width: 400px;
  height: 600px;
`;

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
  component: DatePicker,
  argTypes: {},
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => {
  const [first, setFirst] = useState<Date | undefined>(undefined);
  const [last, setLast] = useState<Date | undefined>(undefined);
  const limitDate = new Date('12-01-2021');
  return (
    <View>
      <Container>
        <DatePicker
          {...args}
          first={first}
          last={last}
          limitDate={limitDate}
          onFirstDateSelected={(date) => setFirst(date)}
          onLastDateSelected={(date) => setLast(date)}
          onRequestClose={() => alert('Requested Close')}
          onSelectionComplete={() => alert('Completed Selecting')}
        />
      </Container>
    </View>
  );
};

export const Desktop = Template.bind({});
Desktop.args = {
  visible: true,
};