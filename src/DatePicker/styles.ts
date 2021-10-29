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
    case 'SELECTED':
      return '#3697eb';

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
    case 'SELECTED':
      return '#3697eb';
    case 'BETWEEN':
      return '#e780e2';

    default:
      return '';
  }
}

type Status = 'EMPTY' | 'DISABLED' | 'SELECTED' | 'ALLOWED' | 'BETWEEN';

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
  border-radius: 5px;
  transition: 0.1s;
  font-size: 18px;
  font-weight: 500;
  opacity: ${(props) => (props.status === 'DISABLED' ? 0.5 : 1)};
  cursor: ${(props) => CursorType(props.status)};
  background-color: ${(props) => BackgroundColor(props.status)};
  &:hover {
    background-color: ${(props) => BackgroundHoverColor(props.status)};
  }
`;

export const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;500;700&family=Open+Sans:wght@300;400;500&display=swap');
  width: 30rem;
  font-family: 'Open Sans';
  box-shadow: 0 0 12px 0 rgb(0, 0, 0, 50%);
  border-radius: 0 0 5px 5px;
  position: absolute;
  top: 25vh;
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
  color: pink;
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
  height: 100%;
  background-color: white;
  padding-bottom: 1rem;
`;

export const WeekdaysLabels = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0.5rem 0.5rem;
`;

export const WeekdayLabel = styled.div`
  width: 100%;
  font-size: 18px;
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
