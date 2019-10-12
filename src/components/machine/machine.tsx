import { inject, observer } from 'mobx-react';
import React from 'react';

import { Cell } from '../../store/Cell';
import { IStoreProp } from '../../store/store';
import { CCell } from '../cell';
import { CCurrencySelect } from '../currencySelect';
import { CMatrix } from '../matrix';
import SS from './machine.module.scss';
import { CProductButton } from '../productButton';
import { CDisplay } from '../display';

@inject('store')
@observer
export class CMachine extends React.Component<IStoreProp> {
  store = this.props.store!;

  render() {
    const { currencySelect, currency, box, exchange, order } = this.store;
    return (
      <div className={SS.machine}>
        <CMatrix data={box} renderCell={this.renderBoxCell} />
        <aside className={SS.panel}>
          <CCurrencySelect onChange={currencySelect} value={currency} />
          <CMatrix data={box} renderCell={this.renderSelectProductCell} />
          <CDisplay rate={exchange[currency]} currency={currency} order={order} />
        </aside>
      </div>
    );
  }

  private renderBoxCell = (cell: Cell) => {
    const { currency, exchange } = this.store;
    return <CCell id={cell.id} product={cell.product} count={cell.count} rate={exchange[currency]} currency={currency} />;
  };

  private renderSelectProductCell = (cell: Cell) => {
    const { order, orderStart } = this.store;
    return <CProductButton cellId={cell.id} isActive={!!order && order.cell === cell} onClick={orderStart} />;
  };
}
