export class I18nEvent<T> {
   protected handlers: { (data: T): void; }[] = [];

   subscribe(handler: { (data: T): void }): { (data: T): void } {
      this.handlers.push(handler);
      return handler;
   }

   unsubscribe(handler: { (data: T): void }): void {
      this.handlers = this.handlers.filter(h => h !== handler);
   }

   next(data: T) {
      this.handlers.slice(0).forEach(h => h(data));
   }

   complete() {
      this.handlers.splice(0, this.handlers.length);
   }
}