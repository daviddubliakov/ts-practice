// Для запуска файла использовать команду ts-node src/index.ts находясь в папке homeworks/2
import { EventEmitter } from './emitter';

import { Emitter, OnEmitTypes, Person, PersonAddData, Persons } from './types';

class Bank extends EventEmitter<Emitter> {
  persons: Persons = {};

  constructor() {
    super();
    this.on(OnEmitTypes.add, (data: PersonAddData) =>
      this.add(data),
    ).on(OnEmitTypes.withdraw, (data: PersonAddData) => this.withdraw(data));
  }

  register(person: Person): number {
    const id: number = Date.now();

    this.persons[id] = { ...person };
    this.emit(OnEmitTypes.register, person);

    return id;
  }

  private add(data: PersonAddData) {
    const { personId, amount } = data;
    const person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    person.balance = person.balance + amount;

    this.emit(OnEmitTypes.changeBalance, {
      name: person.name,
      amount: person.balance,
    });
  }

  private withdraw(data: PersonAddData) {
    const { personId, amount } = data;
    const person = this.persons[personId];

    if (!person) {
      throw new Error(`Пользователь с идентификатором ${personId} не найден`);
    }

    const newBalance = person.balance - amount;

    if (newBalance < 0) {
      throw new Error(`Недостаточно средств для списания: ${amount} со счёта`);
    }

    person.balance = newBalance;

    this.emit(OnEmitTypes.changeBalance, {
      name: person.name,
      amount: person.balance,
    });
  }
}

const bank = new Bank();

const personId = bank.register({
  name: 'Джон Доу',
  balance: 100,
});

bank.emit(OnEmitTypes.add, { personId, amount: 20 });

// Задание со звёздочкой
bank.emit(OnEmitTypes.withdraw, { personId, amount: 20 });
