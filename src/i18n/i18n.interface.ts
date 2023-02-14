import { ILocale } from './locale.interface';

export interface II18n {

  dateFormat?: string;
  timeHMFormat?: string;
  timeHMSFormat?: string;
  dateTimeHMFormat?: string;
  dateTimeHMSFormat?: string;

  separators?: string[];

  firstDayOfWeek: number;
  shortDayNames: string[];
  shortMonthNames: string[];
  longMonthNames: string[];

  currency?: string;

  locale: ILocale;

  translate(s: string): string;
  subscribe(handler: { (locale: ILocale): void }): void;
  unsubscribe(handler: { (locale: ILocale): void }): void;
}
