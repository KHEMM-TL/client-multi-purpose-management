export interface ITimeEvent {
  date: string;
  time: string;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  weekday: number;
  hasDay: boolean;
  hasTime: boolean;
  past: boolean;
  present: boolean;
  future: boolean;
  timeToY(time: string | number | {hour: number, minute: number}, clamp?: boolean): number;
}

export interface VCalendar extends Element {
  scrollToTime(time: number | string | { hour: number, minute: number }): boolean;
}
