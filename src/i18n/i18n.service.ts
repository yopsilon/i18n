/**
 * Copyright (c) 2018-2019 Aleksey Melnikov, m_alx@list.ru
 * @link https://yopsilon.com/
 * @license MIT
*/
import { EnUSLocale } from '../locales/en-us.locale';
import { I18nEvent } from './event';
import { II18n } from './i18n.interface';
import { ILocale } from './locale.interface';

export class I18nService implements II18n {

   private _onLocaleChangeEvent = new I18nEvent<ILocale>();

   /**
    *  List of locales
    */
   public locales: ILocale[] = [];

   private _currentLocaleIndex!: number;

   get onLocaleChange() {
      return this._onLocaleChangeEvent;
   }

   subscribe(handler: { (locale: ILocale): void }): { (locale: ILocale): void } {
      this._onLocaleChangeEvent.subscribe(handler);
      return handler;
   }

   unsubscribe(handler: { (locale: ILocale): void }) {
      this._onLocaleChangeEvent.unsubscribe(handler);
   }

   get locale(): ILocale {
      return this.locales[this._currentLocaleIndex];
   }

   set locale(l: ILocale) {
      let idx = this.locales.indexOf(l);
      if (idx < 0) {
         this.locales.push(l);
         idx = this.locales.length - 1;
      }
      this._currentLocaleIndex = idx;
      this._onLocaleChangeEvent.next(this.locale);
   }

   addLocale(l: ILocale): ILocale {
      if (!this.locales.find(x => x === l)) {
         this.locales.push(l);
      }
      return l;
   }

   get localeShortName() {
      return this.locale.shortName;
   }

   set localeShortName(sn: string) {
      const localeIdx = this.locales.findIndex(l => l.shortName === sn);
      if (localeIdx >= 0) {
         this._currentLocaleIndex = localeIdx;
         this._onLocaleChangeEvent.next(this.locale);
      } else {
         throw new Error(`Locale ${sn} could not be found.`);
      }
   }

   translate(s?: string): string {
      if (!s) {
         return '';
      }

      const res = this.locale.translates[s];
      return res ? res : s;
   }

   get localeName(): string { return this.locale.name; }

   get shortDayNames(): string[] { return this.locale.shortDayNames; }
   get shortMonthNames(): string[] { return this.locale.shortMonthNames; }
   get longMonthNames(): string[] { return this.locale.longMonthNames; }

   get firstDayOfWeek(): number { return this.locale.firstDayOfWeek; }

   get separators(): string[] { return this.locale.separators; }

   get dateFormat(): string { return this.locale.dateFormat; }
   get timeHMFormat(): string { return this.locale.timeHMFormat; }
   get timeHMSFormat(): string { return this.locale.timeHMSFormat; }
   get dateTimeHMFormat(): string { return this.locale.dateTimeHMFormat; }
   get dateTimeHMSFormat(): string { return this.locale.dateTimeHMSFormat; }

   get currency(): string { return this.locale.currency; }

   constructor() {
      const defaultLocale: ILocale = EnUSLocale;
      this.locale = defaultLocale;
   }
}
