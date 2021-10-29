import React, { useEffect, useRef, useState } from 'react';
import {
  Container,
  DaySlot,
  DaysContainer,
  Header,
  HeaderIcon,
  HeaderLabel,
  HeaderMonth,
  HeaderYear,
  MonthContainer,
  WeekdayLabel,
  WeekdaysLabels,
} from './styles';

const MonthNames = [
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
];

type DatePickerProps = {
  first: Date;
  last: Date;
  onFirstDateSelected: (first: Date) => void;
  onLastDateSelected: (last: Date | undefined) => void;
  onSelectionComplete: () => void;
  onRequestClose: () => void;
};

export function DatePicker({
  first,
  last,
  onFirstDateSelected,
  onLastDateSelected,
  onSelectionComplete,
  onRequestClose,
}: DatePickerProps) {
  const Calendar = useRef(null);
  const Today = new Date();
  const [hoveredDate, setHoveredDate] = useState<Date>(new Date());
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState(2021);

  // Listen to clicks outside the calendar
  useEffect(() => {
    function handleClickOutside(event: any) {
      // @ts-ignore
      if (Calendar.current && !Calendar.current.contains(event.target)) {
        onRequestClose();
      }
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  function RenderWeekDays() {
    const Weekdays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'];

    return (
      <>
        {Weekdays.map((weekday) => (
          <WeekdayLabel>{weekday}</WeekdayLabel>
        ))}
      </>
    );
  }
  // This function renders the days elements, from 1 to 30/31
  function RenderDays() {
    const TargetMonth = new Date(year, month, 0);
    const DaysInMonth = TargetMonth.getDate();
    const FirstWeekDay = TargetMonth.getDay();
    let Days = Array.from(Array(DaysInMonth).keys());
    const EmptyDays = new Array(FirstWeekDay).fill(-1);
    Days = [...EmptyDays, ...Days];
    return <>{Days.map((day) => DayShouldRender(day + 1))}</>;
  }
  // Just check if the value is between two values
  function DayIsBetween(Day: Date, First: Date, Last: Date) {
    return Day.getTime() > First?.getTime() && Day.getTime() < Last?.getTime();
  }
  function DayIsAfter(Day: Date, LimitDate: Date) {
    return Day.getTime() > LimitDate?.getTime();
  }
  // This handles how the day should be rendered, if its gonna be clicklable, if its selected, etc
  function DayShouldRender(day: number) {
    if (day === 0) return <DaySlot status="EMPTY"></DaySlot>;
    const DateDay = new Date(`${month + 1}/${day}/${year}`);
    if (DateDay.getTime() < Today.getTime())
      return <DaySlot status="DISABLED">{day}</DaySlot>;

    if (DateDay.getTime() === first?.getTime())
      return <DaySlot status="SELECTED-FIRST">{day}</DaySlot>;

    if (DateDay.getTime() === last?.getTime())
      return <DaySlot status="SELECTED-LAST">{day}</DaySlot>;

    if (DayIsBetween(DateDay, first, hoveredDate))
      return (
        <DaySlot
          status="BETWEEN"
          onClick={() => {
            HandleSelectDay(DateDay);
          }}
          onMouseEnter={() => {
            HandleHoverDate(DateDay);
          }}
        >
          {day}
        </DaySlot>
      );

    return (
      <DaySlot
        status="ALLOWED"
        onClick={() => {
          HandleSelectDay(DateDay);
        }}
        onMouseEnter={() => {
          HandleHoverDate(DateDay);
        }}
      >
        {day}
      </DaySlot>
    );
  }

  function HandlePreviousMonth() {
    if (month > 0) {
      return setMonth(month - 1);
    }
    setMonth(11);
    setYear(year - 1);
  }

  function HandleNextMonth() {
    if (month < 11) {
      return setMonth(month + 1);
    }
    setMonth(0);
    setYear(year + 1);
  }

  function HandleSelectDay(DateDay: Date) {
    if (first && last) {
      onFirstDateSelected(DateDay);
      onLastDateSelected(undefined);
      setHoveredDate(new Date());
      return;
    }
    if (!first) return onFirstDateSelected(DateDay);
    if (first && DayIsAfter(DateDay, first)) {
      onLastDateSelected(DateDay);
      onSelectionComplete();
      return;
    }
  }

  function HandleHoverDate(HoveredDate: Date) {
    if (!last) setHoveredDate(HoveredDate);
  }

  return (
    <Container ref={Calendar}>
      <Header>
        <HeaderIcon onClick={HandlePreviousMonth}>{'<'}</HeaderIcon>
        <HeaderLabel>
          <HeaderMonth>{MonthNames[month]}</HeaderMonth>
          <HeaderYear>{year}</HeaderYear>
        </HeaderLabel>
        <HeaderIcon onClick={HandleNextMonth}>{'>'}</HeaderIcon>
      </Header>
      <MonthContainer>
        <WeekdaysLabels>{RenderWeekDays()}</WeekdaysLabels>
        <DaysContainer>{RenderDays()}</DaysContainer>
      </MonthContainer>
    </Container>
  );
}
