import React from 'react';

import { ECurrency } from '../../shared/types';

interface ICurrencySelectProps {
  className?: string;
  value: ECurrency;
  onChange(currency: ECurrency): void;
}

export class CCurrencySelect extends React.Component<ICurrencySelectProps> {
  render() {
    return (
      <select {...this.props} onChange={this.onChange}>
        {Object.keys(ECurrency).map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    );
  }

  onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    this.props.onChange(event.target.value as ECurrency);
  };
}
