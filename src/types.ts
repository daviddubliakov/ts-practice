export interface Persons {
  [key: number]: Person;
}

export interface Person {
  name: string;
  balance: number;
}

export interface PersonAddData {
  personId: number;
  amount: number;
}

export interface PersonChangeBalanceData
  extends Pick<Person, 'name'>,
    Pick<PersonAddData, 'amount'> {}

export enum OnEmitTypes {
  add = 'add',
  register = 'register',
  changeBalance = 'changeBalance',
  withdraw = 'withdraw',
}

export type EmitData = Person | PersonAddData | PersonChangeBalanceData;

export type Emitter = Person & PersonAddData & PersonChangeBalanceData;

export type Handler<T> = (data: T) => void;
