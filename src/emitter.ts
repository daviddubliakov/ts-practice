import {
  EmitData,
  Emitter,
  Handler,
  OnEmitTypes,
  Person,
  PersonChangeBalanceData,
} from './types';

export class EventEmitter<T extends Emitter> {
  events = Object.create(null);

  constructor() {
    this.on(OnEmitTypes.register, (person: Person) => {
      console.log(`Пользователь ${person.name} был успешно зарегистрирован`);
    }).on(
      OnEmitTypes.changeBalance,
      ({ name, amount }: PersonChangeBalanceData) => {
        console.log(`На счету ${name} — ${amount}$`);
      },
    );
  }

  on(type: OnEmitTypes, handler: Handler<T>) {
    if (type in this.events) {
      this.events[type].push(handler);
    } else {
      this.events[type] = [handler];
    }

    return this;
  }

  emit(type: OnEmitTypes, data: EmitData) {
    const handlers = this.events[type];

    if (Array.isArray(handlers)) {
      handlers.forEach((handler) => handler(data));
    }

    return this;
  }
}
