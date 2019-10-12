import { action, computed, observable } from 'mobx';

import { Product } from './Product';

export interface ICellBase {
  product?: Product;
  count?: number;
}

export interface ICell extends ICellBase {
  id: number;
  max: number;
}

let id = 1;

export class Cell {
  id: number = id++;
  max: number = 20;

  @observable product?: Product = null!;
  @observable count: number = 0;

  constructor(cell?: ICellBase) {
    Object.assign(this, cell);
  }

  @computed get isEmpty() {
    return !this.count || !this.product;
  }

  @action
  put(product: Product, count: number) {
    if (count > this.max) throw new Error('полехче');
    this.product = product;
    this.count = count;
  }

  @action
  clear() {
    this.product = undefined;
    this.count = 0;
    console.log(`товара больше нет в ячейке ${this.id}`);
  }

  @action takeOne() {
    if (!this.count) throw new Error('в ячейке нет товара, алёёё');
    this.count--;
    const product = this.product;
    if (!this.count) this.clear();

    return product;
  }
}
