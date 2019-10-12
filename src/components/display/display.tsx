import React from 'react';

import { ECurrency } from '../../shared/types';
import { Order } from '../../store/Order';
import SS from './display.module.scss';

export interface IDisplayProps {
  order?: Order;
  rate: number;
  currency: ECurrency;
}

export class CDisplay extends React.Component<IDisplayProps> {
  get price() {
    const { order, currency, rate } = this.props;
    if (!order) return '';
    return (order.cell.product!.price / rate).toFixed(2) + ' ' + currency;
  }

  render() {
    const { order } = this.props;
    if (!order) return <div className={SS.Display} />;

    const product = order.cell.product!;
    return (
      <div className={SS.Display}>
        <div className={SS.image} style={{ backgroundImage: `url(${product.image})` }}></div>
        <p className={SS.name}>{product.name}</p>
        <p className={SS.count}>{this.price}</p>
      </div>
    );
  }
}
