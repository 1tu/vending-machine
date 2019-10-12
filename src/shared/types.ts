export enum ECurrency {
  RUR = 'RUR',
  USD = 'USD',
  EUR = 'EUR',
}

export enum ECurrencySymbol {
  RUR = '₽',
  USD = '$',
  EUR = '€',
}

export type TCurrency = keyof typeof ECurrency;
