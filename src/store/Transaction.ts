import { ICreditCard } from './CreditCard';
import { Product } from './Product';

export interface ITransactionCtor {
  product: Product;
  summ: number;
  card: ICreditCard;
}

export interface ITransaction extends ITransactionCtor {
  created: Date;
  id: number;
}

// сервака у нас нет, поэтому ручками
let id = 1;

export class Transaction implements ITransaction {
  id = id++;
  created = new Date();
  product: Product;
  summ: number;
  card: ICreditCard;

  constructor(transaction: ITransactionCtor) {
    Object.assign(this, transaction);
  }
}
