import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import {
  Container,
  DaySlot,
  DaysContainer,
  Header,
  HeaderButton,
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

export type DateRangePickerSelecting = 'first' | 'last';

type DateRangePickerProps = {
  first: Date;
  last?: Date;
  /** shows calendar */
  visible?: boolean;
  /** What is the first date that can be selected */
  startDate?: Date;
  /** What is the limit date that can be selected */
  limitDate?: Date;
  /** Determines which value will be changed next time the user selects a day, if none is provided it will toggle between first and last automatically */
  isSelecting?: DateRangePickerSelecting;
  /** Shows to calendars instead of one, usually for when using as a range picker */
  multiple?: boolean;
  /** Only selects first value, when this is enabled the user cant use it as a range picker, its a single date calendar */
  singleDate?: boolean;
  /** Give a custom name to the week's day, used for translating it to other language */
  weekdaysName?: string[];
  /** Give a custom name to the month's names, used for translating it to other language */
  monthsName?: string[];
  /** Allows you to customize some css, works better if you import the customStyles type, for better intelisense */
  customStyles?: CustomStyles;
  /** Callback whenever the first date is selected, in case you wanna do something in between, like setting a state, redux, etc */
  onFirstDateSelected: (first: Date) => void;
  /** Callback whenever the last date is selected, in case you wanna do something in between, like setting a state, redux, etc */
  onLastDateSelected: (last: Date | undefined) => void;
  /** Callback whenever the first and last date are both selected, or just first in case you using single calendar, in case you wanna do something in between, like setting a state, redux, etc */
  onSelectionComplete: () => void;
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
  isSelecting,
  startDate,
  limitDate,
  multiple,
  singleDate,
  customStyles,
  weekdaysName = Weekdays,
  monthsName = MonthNames,
  onFirstDateSelected,
  onLastDateSelected,
  onSelectionComplete,
}: DateRangePickerProps) {
  const Today = new Date();
  const [hoveredDate, setHoveredDate] = useState<Date>(new Date());
  const [month, setMonth] = useState(Today.getMonth());
  const [year, setYear] = useState(Today.getFullYear());

  useEffect(() => {
    if (first) {
      setMonth(first.getMonth());
      setYear(first.getFullYear());
    }
  }, []);

  function RenderWeekDays() {
    return (
      <>
        {weekdaysName.map((weekday, idx) => (
          <WeekdayLabel key={idx} style={customStyles ? customStyles.WeekdayLabel : {}}>
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
    return (
      <DaysContainer>
        {Days.map((day, idx) => (
          <div key={`${idx}${month}`}>{DayShouldRender(day + 1, month, year)}</div>
        ))}
      </DaysContainer>
    );
  }
  function DayIsBetween(Day: Date, First: Date, Last: Date) {
    if (singleDate) return false;
    if (!Last || !First) return false;
    return dayjs(Day).isAfter(First) && dayjs(Day).isBefore(Last);
  }
  function DayIsAfter(Day: Date, LimitDate: Date) {
    return Day.getTime() > LimitDate?.getTime();
  }
  function DayIsBefore(Day: Date, LimitDate: Date) {
    return Day.getTime() < LimitDate?.getTime();
  }
  function RenderDay(status: Status, day?: number, onClick?: () => void, onHover?: () => void) {
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

    if (startDate && DateDay.getTime() < startDate.getTime()) return RenderDay('DISABLED', day);

    if (limitDate && DateDay.getTime() > limitDate.getTime()) return RenderDay('DISABLED', day);

    if (isSelecting && isSelecting === 'last' && DayIsBefore(DateDay, first))
      return RenderDay('DISABLED', day);

    if (DateDay.getTime() === first?.getTime()) return RenderDay('SELECTED-FIRST', day);

    if (DateDay.getTime() === last?.getTime()) return RenderDay('SELECTED-LAST', day);

    const BetweenFirstHover = DayIsBetween(DateDay, first, hoveredDate);
    const BetweenFirstLast = last ? DayIsBetween(DateDay, first, last) : false;

    if (BetweenFirstHover || BetweenFirstLast)
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
    if (singleDate) {
      onFirstDateSelected(DateDay);
      onSelectionComplete();
      return;
    }
    if (first && last && !isSelecting) {
      onFirstDateSelected(DateDay);
      onLastDateSelected(undefined);
      setHoveredDate(new Date());
      return;
    }
    if (first && last && isSelecting) {
      switch (isSelecting) {
        case 'first':
          onFirstDateSelected(DateDay);
          if (DayIsAfter(DateDay, last)) {
            onLastDateSelected(undefined);
            return;
          }
          break;
        case 'last':
          onLastDateSelected(DateDay);
          setHoveredDate(new Date());
          break;

        default:
          break;
      }
      onSelectionComplete();
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
    const ShouldRenderNext = limitDate ? dayjs(NextMonth).isBefore(limitDate) : true;
    return (
      <HeaderButton
        style={customStyles?.HeaderButton}
        className="nextIcon"
        onClick={HandleNextMonth}
      >
        {ShouldRenderNext ? '>' : ''}
      </HeaderButton>
    );
  }

  function RenderPreviousMonthButton() {
    const PreviousMonth = dayjs(`${year}-${month + 1}-01`).add(-1, 'day');
    const ShouldRenderPrevious = startDate ? dayjs(PreviousMonth).isAfter(startDate) : true;
    return (
      <HeaderButton
        style={customStyles?.HeaderButton}
        className="prevIcon"
        onClick={HandlePreviousMonth}
      >
        {ShouldRenderPrevious ? '<' : ''}
      </HeaderButton>
    );
  }
  // This adds one year if the month is after index 11 (which is december)
  function HandleNextYear(year: number, month: number): { year: number; month: number } {
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
        <WeekdaysLabels style={customStyles ? customStyles.WeekdaysLabelsContainer : {}}>
          {RenderWeekDays()}
        </WeekdaysLabels>
        {RenderDays(year, month)}
      </MonthContainer>
    );
  }

  return (
    <Container
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
