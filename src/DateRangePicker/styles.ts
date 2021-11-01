import { CSSProperties } from 'react';
import styled from 'styled-components';

function CursorType(status: Status) {
  switch (status) {
    case 'EMPTY':
      return '';

    case 'DISABLED':
      return 'not-allowed';

    default:
      return 'pointer';
  }
}

function BackgroundHoverColor(status: Status, pallet?: ColorPalletProps) {
  switch (status) {
    case 'EMPTY':
      return pallet?.backgroundHoverColor?.empty || '';
    case 'ALLOWED':
      return pallet?.backgroundHoverColor?.allowed || '#75bcfc';
    case 'DISABLED':
      return pallet?.backgroundHoverColor?.disabled || '';
    case 'SELECTED-FIRST':
      return pallet?.backgroundHoverColor?.firstSelected || '#3697eb';
    case 'SELECTED-LAST':
      return pallet?.backgroundHoverColor?.lastSelected || '#ff8a00';

    default:
      return '#75bcfc';
  }
}
function BackgroundColor(status: Status, pallet?: ColorPalletProps) {
  switch (status) {
    case 'EMPTY':
      return pallet?.backgroundColor?.empty || '';
    case 'ALLOWED':
      return pallet?.backgroundColor?.allowed || '';
    case 'DISABLED':
      return pallet?.backgroundColor?.disabled || '';
    case 'SELECTED-FIRST':
      return pallet?.backgroundColor?.firstSelected || '#3697eb';
    case 'SELECTED-LAST':
      return pallet?.backgroundColor?.lastSelected || '#ff8a00';
    case 'BETWEEN':
      return pallet?.backgroundColor?.between || '#e5f3ff';

    default:
      return '';
  }
}
function FontColor(status: Status, pallet?: ColorPalletProps) {
  switch (status) {
    case 'SELECTED-FIRST':
      return pallet?.fontColor?.firstSelected || '#FFF';
    case 'SELECTED-LAST':
      return pallet?.fontColor?.lastSelected || '#FFF';

    default:
      return '#3b404d';
  }
}

export type CustomStyles = {
  HeaderContainer?: CSSProperties;
  HeaderYear?: CSSProperties;
  HeaderMonth?: CSSProperties;
  CalendarContainer?: CSSProperties;
  WeekdaysLabelsContainer?: CSSProperties;
  WeekdayLabel?: CSSProperties;
  DaysContainer?: CSSProperties;
  DaySlot?: CSSProperties;
  ColorPallet?: ColorPalletProps;
};

type ColorPalletProps = {
  backgroundColor?: {
    empty?: string;
    disabled?: string;
    firstSelected?: string;
    lastSelected?: string;
    between?: string;
    allowed?: string;
  };
  backgroundHoverColor?: {
    empty?: string;
    disabled?: string;
    firstSelected?: string;
    lastSelected?: string;
    allowed?: string;
  };
  fontColor?: {
    empty?: string;
    disabled?: string;
    firstSelected?: string;
    lastSelected?: string;
    allowed?: string;
  };
};

export type Status =
  | 'EMPTY'
  | 'DISABLED'
  | 'SELECTED-FIRST'
  | 'SELECTED-LAST'
  | 'ALLOWED'
  | 'BETWEEN';

type DaySlotProps = {
  status: Status;
  colorPallet?: ColorPalletProps;
};

export const DaySlot = styled.div<DaySlotProps>`
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.status === 'BETWEEN' ? '' : '5px')};
  transition: 0.1s;
  font-size: 14px;
  font-weight: 700;
  color: ${(props) => FontColor(props.status, props.colorPallet)};
  opacity: ${(props) => (props.status === 'DISABLED' ? 0.5 : 1)};
  cursor: ${(props) => CursorType(props.status)};
  background-color: ${(props) =>
    BackgroundColor(props.status, props.colorPallet)};
  &:hover {
    background-color: ${(props) =>
      BackgroundHoverColor(props.status, props.colorPallet)};
  }
`;

type ContainerProps = {
  visible?: boolean;
  multiple?: boolean;
};

export const Container = styled.div<ContainerProps>`
  max-width: ${(props) => (props.multiple ? '40rem' : '20rem')};
  font-family: 'Open Sans', sans-serif;
  border-radius: 0 0 5px 5px;
  display: ${(props) => (props.visible ? '' : 'none')};
  box-shadow: 0 0 12px rgb(0, 0, 0, 50%);
`;

export const Header = styled.div`
  width: 100%;
  background-color: #008bff;
  border-radius: 5px 5px 0 0;
  height: 2.5rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export const HeaderLabel = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const HeaderMonth = styled.div`
  padding-right: 1rem;
  font-size: 20px;
`;
export const HeaderYear = styled.div`
  font-size: 20px;
  color: ${(props) => (props.color ? props.color : '#ff8a00')};
`;

export const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;

  &.nextIcon {
    padding-right: 1rem;
  }
  &.prevIcon {
    padding-left: 1rem;
  }
`;

export const MonthContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding-bottom: 1rem;
  border-radius: 0 0 5px 5px;
  & + & {
    margin-left: 1rem;
  }
`;

export const WeekdaysLabels = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0;
`;

export const WeekdayLabel = styled.div`
  width: 100%;
  font-size: 12px;
  opacity: 0.7;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DaysContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.625rem 0;
`;

export const MultipleMonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderLabelGap = styled.span`
  width: 4rem;
`;
