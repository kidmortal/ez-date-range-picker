import dayjs from 'dayjs';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
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

const MultipleMonthsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const Gap = styled.span`
  width: 6rem;
`;

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
  visible?: boolean;
  startDate?: Date;
  limitDate?: Date;
  multiple?: boolean;
  onFirstDateSelected: (first: Date) => void;
  onLastDateSelected: (last: Date | undefined) => void;
  onSelectionComplete: () => void;
  onRequestClose: () => void;
};

export function DatePicker({
  first,
  last,
  visible,
  startDate,
  limitDate,
  multiple,
  onFirstDateSelected,
  onLastDateSelected,
  onSelectionComplete,
  onRequestClose,
}: DatePickerProps) {
  const Calendar = useRef(null);
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
    const Weekdays = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB', 'DOM'];

    return (
      <>
        {Weekdays.map((weekday) => (
          <WeekdayLabel>{weekday}</WeekdayLabel>
        ))}
      </>
    );
  }
  // This function renders the days elements, from 1 to 30/31
  function RenderDays(year: number, month: number) {
    const TargetMonth = dayjs(`${year}-${month + 1}-01`);
    // Count how many days there are in this month
    const DaysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    // Gets when is the first day of this month, sunday? wednesday?
    let FirstWeekDay = TargetMonth.startOf('month').day();
    if (FirstWeekDay === 0) FirstWeekDay++;
    let Days = Array.from(Array(DaysInMonth).keys());
    // This fills the first days that with blank spaces, to place the first day correctly
    const EmptyDays = new Array(FirstWeekDay - 1).fill(-1);
    Days = [...EmptyDays, ...Days];
    // This fills the remaining spaces with blank splaces, so every calendar has the same size
    const remainingDays = 42 - Days.length;
    const AfterEmptyDays = new Array(remainingDays).fill(-1);
    Days = [...Days, ...AfterEmptyDays];
    return <>{Days.map((day) => DayShouldRender(day + 1, month, year))}</>;
  }
  // Just check if the value is between two values
  function DayIsBetween(Day: Date, First: Date, Last: Date) {
    return dayjs(Day).isAfter(First) && dayjs(Day).isBefore(Last);
  }
  function DayIsAfter(Day: Date, LimitDate: Date) {
    return Day.getTime() > LimitDate?.getTime();
  }
  // This handles how the day should be rendered, if its gonna be clicklable, if its selected, etc
  function DayShouldRender(day: number, month: number, year: number) {
    if (day === 0) return <DaySlot status="EMPTY"></DaySlot>;
    const DayDate = HandleNextYear(year, month);
    const DateDay = new Date(`${DayDate.month + 1}/${day}/${DayDate.year}`);
    console.log(DateDay);
    if (startDate && DateDay.getTime() < startDate.getTime())
      return <DaySlot status="DISABLED">{day}</DaySlot>;

    if (limitDate && DateDay.getTime() > limitDate.getTime())
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
    if (first && !DayIsAfter(DateDay, first)) {
      onFirstDateSelected(DateDay);
    }
    if (first && DayIsAfter(DateDay, first)) {
      onLastDateSelected(DateDay);
      onSelectionComplete();
      return;
    }
  }

  function HandleHoverDate(HoveredDate: Date) {
    console.log(HoveredDate);
    if (!last) setHoveredDate(HoveredDate);
  }

  function RenderNextMonthButton() {
    const NextMonth = dayjs(`${year}-${month}-01`)
      .add(2, 'month')
      .add(-1, 'day');
    const ShouldRenderNext = limitDate
      ? dayjs(NextMonth).isBefore(limitDate)
      : true;

    return (
      <HeaderIcon onClick={HandleNextMonth}>
        {ShouldRenderNext ? '>' : ''}
      </HeaderIcon>
    );
  }

  function RenderPreviousMonthButton() {
    const PreviousMonth = dayjs(`${year}-${month}-01`).add(-1, 'day');
    const ShouldRenderPrevious = limitDate
      ? dayjs(PreviousMonth).isAfter(startDate)
      : true;
    return (
      <HeaderIcon onClick={HandlePreviousMonth}>
        {ShouldRenderPrevious ? '<' : ''}
      </HeaderIcon>
    );
  }
  // This adds one year if the month is after index 11 (which is december)
  function HandleNextYear(
    year: number,
    month: number
  ): { year: number; month: number } {
    if (month > 11) {
      year++;
      month = 0;
    }
    return { year, month };
  }

  function RenderHeader(year: number, month: number) {
    const HeaderDate = HandleNextYear(year, month);
    return (
      <HeaderLabel>
        <HeaderMonth>{MonthNames[HeaderDate.month]}</HeaderMonth>
        <HeaderYear>{HeaderDate.year}</HeaderYear>
      </HeaderLabel>
    );
  }

  return (
    <Container ref={Calendar} visible={visible} multiple={multiple}>
      <Header>
        {RenderPreviousMonthButton()}
        {RenderHeader(year, month)}
        {multiple && <Gap />}
        {multiple && RenderHeader(year, month + 1)}
        {RenderNextMonthButton()}
      </Header>
      <MultipleMonthsContainer>
        <MonthContainer>
          <WeekdaysLabels>{RenderWeekDays()}</WeekdaysLabels>
          <DaysContainer>{RenderDays(year, month)}</DaysContainer>
        </MonthContainer>
        {multiple && (
          <MonthContainer>
            <WeekdaysLabels>{RenderWeekDays()}</WeekdaysLabels>
            <DaysContainer>{RenderDays(year, month + 1)}</DaysContainer>
          </MonthContainer>
        )}
      </MultipleMonthsContainer>
    </Container>
  );
}
