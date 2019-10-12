import React, { Fragment } from 'react';

import { Cell } from '../../store/Cell';
import SS from './matrix.module.scss';

export interface IMatrixProps {
  data: Cell[][];
  renderCell: (cell: Cell) => React.ReactNode;
}

export class CMatrix extends React.Component<IMatrixProps> {
  render() {
    const { renderCell } = this.props;
    return (
      <div className={SS.container}>
        {this.props.data.map((row, index) => (
          <div key={index} className={SS.row}>
            {row.map((cell) => <Fragment key={cell.id}>{renderCell(cell)}</Fragment>)}
          </div>
        ))}
      </div>
    );
  }
}
