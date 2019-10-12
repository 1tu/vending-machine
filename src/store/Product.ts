import { ECurrency } from '../shared/types';
import { observable, action } from 'mobx';

export interface IProductCtor {
  name: string;
  price: number;
  currency: ECurrency;
  image: string;
}

export interface IProduct extends IProductCtor {
  id: number;
}

// сервака у нас нет, поэтому ручками
let id = 1;

export class Product implements IProduct {
  id: number = id++;
  name: string;
  currency: ECurrency;
  image: string;
  @observable price: number;

  constructor(product: IProductCtor) {
    Object.assign(this, product);
  }

  @action
  setPrice(price: number) {
    this.price = price;
  }
}
