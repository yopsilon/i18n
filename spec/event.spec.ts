import { I18nEvent } from "../src/i18n/event";

describe(`Subscribe on Event:`, () => {
    const evt = new I18nEvent();
    let fired = false;
    evt.subscribe(x => {
        fired = true;
    });

    evt.next('');

    it('Event fired', () => expect(fired).toBeTrue());
});

describe(`Complete event:`, () => {
    const evt = new I18nEvent();
    let fired = false;
    evt.subscribe(x => {
        fired = true;
    });

    evt.complete();

    evt.next('');

    it('Event not fired', () => expect(fired).toBeFalse());
});