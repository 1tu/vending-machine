import { ECurrency } from '../shared/types';
import { apiBank } from '../api/api.bank';

export interface ICreditCardCtor {
  name: string;
  currency: ECurrency;
}

export interface ICreditCard extends ICreditCardCtor {
  id: number;
}

// сервака у нас нет, поэтому ручками
let id = 1;

export class CreditCard implements ICreditCard {
  id = id++;
  name: string;
  currency: ECurrency;

  constructor(creditCard: ICreditCardCtor) {
    Object.assign(this, creditCard);
  }

  pay(summ: number) {
    return apiBank.payment(this, summ);
  }

  getData(): ICreditCard {
    return { currency: this.currency, id: this.id, name: this.name };
  }
}
