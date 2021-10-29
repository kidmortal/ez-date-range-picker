import dayjs from 'dayjs';
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
  visible?: boolean;
  startDate?: Date;
  limitDate?: Date;
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
  function RenderDays() {
    const TargetMonth = dayjs(`${year}-${month + 1}-01`);
    const DaysInMonth = dayjs(`${year}-${month + 1}-01`).daysInMonth();
    let FirstWeekDay = TargetMonth.startOf('month').day();
    if (FirstWeekDay === 0) FirstWeekDay++;
    let Days = Array.from(Array(DaysInMonth).keys());
    const EmptyDays = new Array(FirstWeekDay - 1).fill(-1);
    console.log(FirstWeekDay);
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
    if (first && DayIsAfter(DateDay, first)) {
      onLastDateSelected(DateDay);
      onSelectionComplete();
      return;
    }
  }

  function HandleHoverDate(HoveredDate: Date) {
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
    return <HeaderIcon onClick={HandlePreviousMonth}>{'<'}</HeaderIcon>;
  }

  return (
    <Container ref={Calendar} visible={visible}>
      <Header>
        {RenderPreviousMonthButton()}
        <HeaderLabel>
          <HeaderMonth>{MonthNames[month]}</HeaderMonth>
          <HeaderYear>{year}</HeaderYear>
        </HeaderLabel>
        {RenderNextMonthButton()}
      </Header>
      <MonthContainer>
        <WeekdaysLabels>{RenderWeekDays()}</WeekdaysLabels>
        <DaysContainer>{RenderDays()}</DaysContainer>
      </MonthContainer>
    </Container>
  );
}
