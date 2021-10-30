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

function BackgroundHoverColor(status: Status) {
  switch (status) {
    case 'EMPTY':
      return '';
    case 'DISABLED':
      return '';
    case 'SELECTED-FIRST':
      return '#3697eb';
    case 'SELECTED-LAST':
      return '#ff8a00';

    default:
      return '#75bcfc';
  }
}
function BackgroundColor(status: Status) {
  switch (status) {
    case 'EMPTY':
      return '';
    case 'ALLOWED':
      return '';
    case 'DISABLED':
      return '';
    case 'SELECTED-FIRST':
      return '#3697eb';
    case 'SELECTED-LAST':
      return '#ff8a00';
    case 'BETWEEN':
      return '#e5f3ff';

    default:
      return '';
  }
}
function FontColor(status: Status) {
  switch (status) {
    case 'SELECTED-FIRST':
      return '#FFF';
    case 'SELECTED-LAST':
      return '#FFF';

    default:
      return '#3b404d';
  }
}

type Status =
  | 'EMPTY'
  | 'DISABLED'
  | 'SELECTED-FIRST'
  | 'SELECTED-LAST'
  | 'ALLOWED'
  | 'BETWEEN';

type DaySlotProps = {
  status: Status;
};

export const DaySlot = styled.div<DaySlotProps>`
  width: 100%;
  height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.status === 'BETWEEN' ? '' : '5px')};
  transition: 0.1s;
  font-size: 18px;
  font-weight: 500;
  color: ${(props) => FontColor(props.status)};
  opacity: ${(props) => (props.status === 'DISABLED' ? 0.5 : 1)};
  cursor: ${(props) => CursorType(props.status)};
  background-color: ${(props) => BackgroundColor(props.status)};
  &:hover {
    background-color: ${(props) => BackgroundHoverColor(props.status)};
  }
`;

type ContainerProps = {
  visible?: boolean;
  multiple?: boolean;
};

export const Container = styled.div<ContainerProps>`
  width: ${(props) => (props.multiple ? '80vw' : '40vw')};
  font-family: 'Open Sans', sans-serif;
  box-shadow: 0 0 12px 0 rgb(0, 0, 0, 50%);
  border-radius: 0 0 5px 5px;
  display: ${(props) => (props.visible ? '' : 'none')};
`;

export const Header = styled.div`
  background-color: #008bff;
  border-radius: 5px 5px 0 0;
  height: 3rem;
  font-weight: 400;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 1rem;
  align-items: center;
  font-size: 20px;
  color: white;
`;

export const HeaderLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const HeaderMonth = styled.div`
  padding-right: 1rem;
  font-size: 24px;
`;
export const HeaderYear = styled.div`
  font-size: 24px;
  color: #ff8a00;
`;

export const HeaderIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2rem;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
`;

export const MonthContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: white;
  padding-bottom: 1rem;
  border-radius: 0 0 5px 5px;
`;

export const WeekdaysLabels = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem;
`;

export const WeekdayLabel = styled.div`
  width: 100%;
  font-size: 14px;
  opacity: 0.7;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 0.625rem 0;
  padding: 0.5rem 0.5rem;
`;
