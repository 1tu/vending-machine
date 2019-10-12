import { action, observable, runInAction } from 'mobx';

import { apiBank, EBankTransactionState, IExchangeRate } from '../api/api.bank';
import { ECurrency } from '../shared/types';
import { sleep } from '../shared/util';
import { Cell } from './Cell';
import { CreditCard } from './CreditCard';
import { EOrderState, Order } from './Order';
import { Product } from './Product';
import { Transaction } from './Transaction';

export interface IStoreProp {
  store?: Store;
}

export class Store {
  @observable ready = false;

  box = [
    [
      new Cell({
        count: 2,
        product: new Product({
          currency: ECurrency.RUR,
          image: 'https://xn--80aaokptod6b.xn--p1ai/wp-content/uploads/2018/06/Image7-3-768x512.jpg',
          name: 'Орех',
          price: 957,
        }),
      }),
      new Cell(),
      new Cell(),
      new Cell(),
    ],
    [new Cell(), new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell(), new Cell()],
    [new Cell(), new Cell(), new Cell(), new Cell()],
  ];

  get cellList() {
    return this.box.flat();
  }

  @observable.shallow buyedProductList: Product[] = []; // товары в лотке выдачи

  @observable password = 'password';
  @observable currency: ECurrency = ECurrency.RUR; // выбранная валюта
  @observable exchange: IExchangeRate = null!;

  @observable.shallow transactionList: Transaction[] = []; // список совершенных покупок
  @observable order?: Order = null!; // текущая сделка

  async init() {
    if (this.ready) return;
    await this.exchangeUpdate();
    runInAction(() => (this.ready = true));
    this.exchangeTick();
  }

  putProductToCell(cellId: number, product: Product, count: number) {
    const cell = this.getCell(cellId);
    if (cell) cell.put(product, count);
  }

  @action.bound
  currencySelect(currency: ECurrency) {
    this.currency = currency;
    try {
      if (this.order) this.order.setCurrency(this.currency);
    } catch (error) {
      this.orderCancel();
    }
  }

  @action.bound
  orderStart(cellId: number) {
    const cell = this.getCell(cellId);
    if (!cell || cell.isEmpty) return (this.order = undefined);

    try {
      if (this.order) this.order.setCell(cell);
      else this.order = new Order({ currency: this.currency, cell: cell });
    } catch (error) {
      this.orderCancel();
    }
  }

  async orderPay(card: CreditCard) {
    if (!this.order) return;
    this.order.setState(EOrderState.AWAIT_BANK);
    const exchange = await apiBank.exchangeRate();
    const summ = this.order.cell.product!.price / exchange[card.currency];
    const res = await card.pay(summ);

    if (res === EBankTransactionState.OK) this.orderFinish();
    else this.order.setError(res);
  }

  async orderFinish() {
    if (!this.order) return;
    try {
      this.order.setState(EOrderState.SHIP);
      const product = this.order.cell.takeOne()!;
      await sleep(2000);
      this.order.setState(EOrderState.SUCCESS);
      runInAction(() => this.buyedProductList.push(product));
    } catch (error) {
      // такого не должно быть, т.к. в начале идет проверка на isEmpty
      this.orderCancel();
    }
  }

  @action
  orderCancel() {
    this.order = undefined;
  }

  @action
  takeProduct() {
    return this.buyedProductList.pop();
  }

  private async exchangeTick() {
    await this.exchangeUpdate();
    setTimeout(() => this.exchangeTick(), 5000);
  }

  private async exchangeUpdate() {
    try {
      const res = await apiBank.exchangeRate();
      runInAction(() => (this.exchange = res));
    } catch (error) {}
  }

  private getCell(cellId: number) {
    return this.cellList.find((c) => c.id === cellId);
  }
}

export const store = new Store();
