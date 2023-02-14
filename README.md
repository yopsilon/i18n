# Yopsilon I18n
Simple internationalization library for the Yopsilon components.

## Installation

```
npm install @yopsilon/i18n --save
```

## Usage

``` ts
import { I18nService, ILocale } from "@yopsilon/i18n";

const i18n = new I18nService();

i18n.subscribe(x => {
    alert(`Locale changed to ${x.shortName}. Default date format is '${x.dateFormat}'.`);
});

const localePt: ILocale = {

    name: 'Portuguese',
    shortName: 'pt-PT',
    shortMonthNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul',
        'Ago', 'Set', 'Out', 'Nov', 'Dez'],

    longMonthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
        'Dezembro'],

    longMonthNamesGenitive: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro',
        'Dezembro'],

    shortDayNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],

    longDayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta',
        'Quinta', 'Sexta', 'Sábado'],

    firstDayOfWeek: 1,

    dateFormat: 'dd-mm-yyyy',
    midDateFormat: 'dd mmm yyyy',
    longDateFormat: 'dd mmmm yyyy',
    timeHMFormat: 'HH:mi',
    timeHMSFormat: 'HH:mi:ss',
    dateTimeHMFormat: 'dd-mm-yyyy HH:mi',
    dateTimeHMSFormat: 'dd-mm-yyyy HH:mi:ss',

    separators: [',', '.'],
    currency: '{1-12.2} €',

    yesterday: 'Ontem',
    translates: {}
};


i18n.locale = localePt;
```