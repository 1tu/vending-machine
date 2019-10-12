import React from 'react';

import SS from './productButton.module.scss';

export interface IProductButtonProps {
  cellId: number;
  isActive?: boolean;
  onClick(cellId: number): void;
}

export class CProductButton extends React.PureComponent<IProductButtonProps> {
  render() {
    const { cellId, isActive } = this.props;

    return (
      <div className={SS.container}>
        <button className={`${SS.button} ${isActive ? SS.active : ''}`} onClick={this.onClick} />
        <p className={SS.name}>#{cellId}</p>
      </div>
    );
  }

  private onClick = () => this.props.onClick(this.props.cellId);
}
