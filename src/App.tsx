import SS from './App.module.scss';

import React from 'react';

import { Machine } from './components/machine/machine';

export class Application extends React.Component {
  public render() {
    return (
      <div className={SS.App}>
        <Machine />
      </div>
    );
  }
}
