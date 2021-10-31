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
  CustomStyles,
  Status,
  MultipleMonthsContainer,
  HeaderLabelGap,
} from './styles';

type DateRangePickerProps = {
  first: Date;
  last: Date;
  visible?: boolean;
  startDate?: Date;
  limitDate?: Date;
  multiple?: boolean;
  weekdaysName?: string[];
  monthsName?: string[];
  customStyles?: CustomStyles;
  onFirstDateSelected: (first: Date) => void;
  onLastDateSelected: (last: Date | undefined) => void;
  onSelectionComplete: () => void;
  onRequestClose: () => void;
};
const Weekdays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
const MonthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export function DateRangePicker({
  first,
  last,
  visible,
  startDate,
  limitDate,
  multiple,
  customStyles,
  weekdaysName = Weekdays,
  monthsName = MonthNames,
  onFirstDateSelected,
  onLastDateSelected,
  onSelectionComplete,
  onRequestClose,
}: DateRangePickerProps) {
  const Calendar = useRef(null);
  const Today = new Date();
  const [hoveredDate, setHoveredDate] = useState<Date>(new Date());
  const [month, setMonth] = useState(Today.getMonth() + 1);
  const [year, setYear] = useState(Today.getFullYear());

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
    return (
      <>
        {weekdaysName.map((weekday, idx) => (
          <WeekdayLabel
            key={idx}
            style={customStyles ? customStyles.WeekdayLabel : {}}
          >
            {weekday}
          </WeekdayLabel>
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
  function DayIsBetween(Day: Date, First: Date, Last: Date) {
    return dayjs(Day).isAfter(First) && dayjs(Day).isBefore(Last);
  }
  function DayIsAfter(Day: Date, LimitDate: Date) {
    return Day.getTime() > LimitDate?.getTime();
  }
  function RenderDay(
    status: Status,
    day?: number,
    onClick?: () => void,
    onHover?: () => void
  ) {
    return (
      <DaySlot
        key={day}
        status={status}
        onClick={onClick && onClick}
        onMouseEnter={onHover && onHover}
        colorPallet={customStyles?.ColorPallet ? customStyles.ColorPallet : {}}
      >
        {day}
      </DaySlot>
    );
  }
  // This handles how the day should be rendered, if its gonna be clicklable, if its selected, etc
  function DayShouldRender(day: number, month: number, year: number) {
    if (day === 0) return <DaySlot status="EMPTY"></DaySlot>;
    const DayDate = HandleNextYear(year, month);
    const DateDay = new Date(`${DayDate.month + 1}/${day}/${DayDate.year}`);

    if (startDate && DateDay.getTime() < startDate.getTime())
      return RenderDay('DISABLED', day);

    if (limitDate && DateDay.getTime() > limitDate.getTime())
      return RenderDay('DISABLED', day);

    if (DateDay.getTime() === first?.getTime())
      return RenderDay('SELECTED-FIRST', day);

    if (DateDay.getTime() === last?.getTime())
      return RenderDay('SELECTED-LAST', day);

    if (DayIsBetween(DateDay, first, hoveredDate))
      return RenderDay(
        'BETWEEN',
        day,
        () => HandleSelectDay(DateDay),
        () => HandleHoverDate(DateDay)
      );

    return RenderDay(
      'ALLOWED',
      day,
      () => HandleSelectDay(DateDay),
      () => HandleHoverDate(DateDay)
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
    if (first && last) return;
    if (!first && !last) return;
    setHoveredDate(HoveredDate);
  }

  function RenderNextMonthButton() {
    const NextMonth = dayjs(`${year}-${month + 1}-01`)
      .add(1, 'month')
      .add(-1, 'day');
    const ShouldRenderNext = limitDate
      ? dayjs(NextMonth).isBefore(limitDate)
      : true;
    return (
      <HeaderIcon className="nextIcon" onClick={HandleNextMonth}>
        {ShouldRenderNext ? '>' : ''}
      </HeaderIcon>
    );
  }

  function RenderPreviousMonthButton() {
    const PreviousMonth = dayjs(`${year}-${month + 1}-01`).add(-1, 'day');
    const ShouldRenderPrevious = startDate
      ? dayjs(PreviousMonth).isAfter(startDate)
      : true;
    return (
      <HeaderIcon className="prevIcon" onClick={HandlePreviousMonth}>
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
        <HeaderMonth style={customStyles ? customStyles.HeaderMonth : {}}>
          {monthsName[HeaderDate.month]}
        </HeaderMonth>
        <HeaderYear style={customStyles ? customStyles.HeaderYear : {}}>
          {HeaderDate.year}
        </HeaderYear>
      </HeaderLabel>
    );
  }

  function RenderMonth(year: number, month: number) {
    return (
      <MonthContainer>
        <WeekdaysLabels
          style={customStyles ? customStyles.WeekdaysLabelsContainer : {}}
        >
          {RenderWeekDays()}
        </WeekdaysLabels>
        <DaysContainer>{RenderDays(year, month)}</DaysContainer>
      </MonthContainer>
    );
  }

  return (
    <Container
      ref={Calendar}
      visible={visible}
      multiple={multiple}
      style={customStyles ? customStyles.CalendarContainer : {}}
    >
      <Header style={customStyles ? customStyles.HeaderContainer : {}}>
        {RenderPreviousMonthButton()}
        {RenderHeader(year, month)}
        {multiple && <HeaderLabelGap />}
        {multiple && RenderHeader(year, month + 1)}
        {RenderNextMonthButton()}
      </Header>
      <MultipleMonthsContainer>
        {RenderMonth(year, month)}
        {multiple && RenderMonth(year, month + 1)}
      </MultipleMonthsContainer>
    </Container>
  );
}
