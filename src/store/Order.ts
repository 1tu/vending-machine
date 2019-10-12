import { action, observable } from 'mobx';

import { EBankTransactionState } from '../api/api.bank';
import { ECurrency } from '../shared/types';
import { Cell } from './Cell';

export enum EOrderState {
  NEW,
  AWAIT_BANK,
  SHIP,
  SUCCESS,
  ERROR_CELL,
  ERROR_BANK,
}

export interface IOrderCtor {
  cell: Cell;
  currency: ECurrency;
}

export interface IOrder extends IOrderCtor {
  id: number;
  created: Date;
  state: EOrderState;
  error?: EBankTransactionState;
}

// сервака у нас нет, поэтому ручками
let id = 1;

export class Order implements IOrder {
  id = id++;
  created = new Date();
  @observable error?: EBankTransactionState;
  @observable state: EOrderState = EOrderState.NEW;

  @observable cell: Cell;
  @observable currency: ECurrency;

  constructor(order: IOrderCtor) {
    Object.assign(this, order);
  }

  @action
  setCell(cell: Cell) {
    if (this.state !== EOrderState.NEW) throw new Error('не не не, так не катит');
    this.cell = cell;
  }

  @action
  setCurrency(currency: ECurrency) {
    if (this.state !== EOrderState.NEW) throw new Error('не не не, так не катит');
    this.currency = currency;
  }

  @action
  setState(state: EOrderState) {
    this.state = state;
  }

  @action
  setError(error: EBankTransactionState) {
    this.state = EOrderState.ERROR_BANK;
    this.error = error;
  }
}
