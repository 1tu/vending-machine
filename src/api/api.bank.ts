import { CreditCard } from '../store/CreditCard';
import { sleep, getRandom } from '../shared/util';
import { TCurrency } from '../shared/types';

const MOCK_CARD_LIMIT = 500;

export enum EBankTransactionState {
  OK,
  NO_MONEY,
  NO_CONNECT,
}

export type IExchangeRate = { [C in TCurrency]: number };

class ApiBank {
  async payment(card: CreditCard, summ: number) {
    await sleep(3000);
    if (getRandom(1, 100) < 10) return EBankTransactionState.NO_CONNECT;
    return summ < MOCK_CARD_LIMIT ? EBankTransactionState.OK : EBankTransactionState.NO_MONEY;
  }

  async exchangeRate() {
    await sleep(1000);
    return {
      RUR: 1,
      USD: 60 + getRandom(1, 10),
      EUR: 80 + getRandom(2, 20),
    } as IExchangeRate;
  }
}

export const apiBank = new ApiBank();
