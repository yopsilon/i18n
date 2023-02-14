export interface ILocale {
  name: string;
  shortName: string;

  shortMonthNames: Array<string>;
  longMonthNames: Array<string>;
  shortDayNames: Array<string>;
  longDayNames: Array<string>;
  longMonthNamesGenitive: Array<string>;

  firstDayOfWeek: number;

  dateFormat: string;
  midDateFormat: string;
  longDateFormat: string;
  timeHMFormat: string;
  timeHMSFormat: string;
  dateTimeHMFormat: string;
  dateTimeHMSFormat: string;

  yesterday: string;

  separators: Array<string>;
  currency: string;

  translates?: { [id: string]: string };
}
