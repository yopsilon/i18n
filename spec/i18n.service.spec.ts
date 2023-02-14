import { I18nService } from '../src/i18n/i18n.service';
import { ILocale } from '../src/i18n/locale.interface';

const ruRu: ILocale = {
    name: "Russian",
    shortName: "ru-RU",
    shortMonthNames: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл",
                      "Авг", "Сен", "Окт", "Ноя", "Дек"],

    longMonthNames:  ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                      "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь",
                      "Декабрь"],

    longMonthNamesGenitive:  ["января", "февраля", "марта", "апреля", "мая", "июня",
                      "июля", "августа", "сентября", "октября", "ноября",
                      "декабря"],
    shortDayNames:   ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],

    longDayNames:    ["Воскресенье", "Понедельник", "Вторник", "Среда",
                      "Четверг", "Пятница", "Суббота"],

    firstDayOfWeek: 1,

    timeHMFormat: "HH:mi",
    timeHMSFormat: "HH:mi:ss",
    dateTimeHMFormat: "dd.mm.yyyy HH:mi",
    dateTimeHMSFormat: "dd.mm.yyyy HH:mi:ss",

    dateFormat: "dd.mm.yyyy",
    midDateFormat: "dd mmm yy",
    longDateFormat: "dd mmmmm yyyy",

    separators: [",", " "],
    currency: "{N1-12.2} ₽",

    yesterday: "Вчера",

    translates: {
       'Today': 'Сегодня'
    }
};

describe(`Default locale:`, () => {
    const srv = new I18nService();
    it(`must be en-US`, () => expect(srv.locale.shortName).toBe('en-US'));
});


describe(`Set locale`, () => {

    const srv = new I18nService();
    srv.locale = ruRu;

    it(`New count of locales must be 2`, () => expect(srv.locales.length).toBe(2));
    it(`Current locale must be ru-RU`, () => expect(srv.locale.shortName).toBe('ru-RU'));
});

describe(`Set not existing locale`, () => {
    const srv = new I18nService();
    it('Must throw error',
        () => expect(() => {
            srv.localeShortName = 'en-EN'
        }).toThrowError('Locale en-EN could not be found.')
    );
});

describe(`Add and set locale:`, () => {

    const srv = new I18nService();

    srv.addLocale(ruRu);
    it(`New count of locales must be 2`, () => expect(srv.locales.length).toBe(2));

    srv.localeShortName = ruRu.shortName;
    it(`Current locale must be ru-RU`, () => expect(srv.locale.shortName).toBe('ru-RU'));
    it(`Locale name must be Russian`, () => expect(srv.localeName).toBe('Russian'));
    it(`Sunday day name must be Воскресенье`, () => expect(srv.shortDayNames[0]).toBe('Вс'));
    it(`First day of week must be 1`, () => expect(srv.firstDayOfWeek).toBe(1));
    it(`First month name must be Январь`, () => expect(srv.longMonthNames[0]).toBe('Январь'));
    it(`First short month name must be Янв`, () => expect(srv.shortMonthNames[0]).toBe('Янв'));
    it(`Decimal separator must be ','`, () => expect(srv.separators[0]).toBe(','));
    it(`Thousand separator must be ' '`, () => expect(srv.separators[1]).toBe(' '));
    it(`Date format must be 'dd.mm.yyyy'`, () => expect(srv.dateFormat).toBe('dd.mm.yyyy'));
    it(`Time HM format must be 'HH:mm'`, () => expect(srv.timeHMFormat).toBe('HH:mi'));
    it(`Time HMS format must be 'HH:mm:ss'`, () => expect(srv.timeHMSFormat).toBe('HH:mi:ss'));
    it(`Date/time HM format must be 'HH:mm'`, () => expect(srv.dateTimeHMFormat).toBe('dd.mm.yyyy HH:mi'));
    it(`Date/time HMS format must be 'HH:mm:ss'`, () => expect(srv.dateTimeHMSFormat).toBe('dd.mm.yyyy HH:mi:ss'));
    it(`Currency format must be {N1-12.2} ₽`, () => expect(srv.currency).toBe('{N1-12.2} ₽'));
});


describe(`Add already existing locale`, () => {

    const srv = new I18nService();
    srv.addLocale(srv.locales[0]);
    it(`Count of locales must be 1`, () => expect(srv.locales.length).toBe(1));
});


describe(`Translate of `, () => {
    const srv = new I18nService();
    srv.locale = ruRu;
    it(`'Today' must be 'Сегодня'`, () => expect(srv.translate('Today')).toBe('Сегодня'));
    it(`empty string must be empty`, () => expect(srv.translate('')).toBe(''));
    it(`not existing phrase must be the same phrase`, () => expect(srv.translate('Not existing phrase')).toBe('Not existing phrase'));
});

describe(`Subscribe to locale change event: `, () => {

    const srv = new I18nService();
    let currentLocaleName = srv.locale.shortName;

    const subscription = srv.onLocaleChange.subscribe(x => {
        currentLocaleName = x.shortName;
    });

    srv.locale = ruRu;

    srv.onLocaleChange.unsubscribe(subscription);

    it(`Locale after the event fired must be ru-RU`, () => expect(currentLocaleName).toBe('ru-RU'));

});

describe(`Unsubscribe to locale change event: `, () => {

    const srv = new I18nService();
    let currentLocaleName = srv.locale.shortName;

    const subscription = srv.subscribe(x => {
        currentLocaleName = x.shortName;
    });

    srv.locale = ruRu;
    srv.unsubscribe(subscription);
    srv.locale = srv.locales[0];

    it(`Locale after unsubscribing must be ru-RU`, () => expect(currentLocaleName).toBe('ru-RU'));
    it(`Srv locale must be en-US`, () => expect(srv.localeShortName).toBe('en-US'));
});