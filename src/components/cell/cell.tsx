import React from 'react';

import { ECurrency } from '../../shared/types';
import { Product } from '../../store/Product';
import SS from './cell.module.scss';

export interface ICellProps {
  id: number;
  product?: Product;
  count?: number;
  rate: number;
  currency: ECurrency;
}

export class CCell extends React.PureComponent<ICellProps> {
  get price() {
    const { product, currency, rate } = this.props;
    if (!product) return '';
    return (product.price / rate).toFixed(2) + ' ' + currency;
  }

  render() {
    const { product, count } = this.props;
    if (!product) return <div className={SS.cell} />;

    return (
      <div className={SS.cell}>
        <div className={SS.image} style={{ backgroundImage: `url(${product.image})` }}></div>
        <p className={SS.name}>
          {product.name} ({count} шт.)
        </p>
        <p className={SS.count}>{this.price}</p>
      </div>
    );
  }
}
