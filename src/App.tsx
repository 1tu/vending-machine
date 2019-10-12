import SS from './App.module.scss';

import React from 'react';

import { CMachine } from './components/machine';
import { store } from './store/store';
import { Provider, observer } from 'mobx-react';

@observer
export class Application extends React.Component {
  componentDidMount() {
    store.init();
  }

  public render() {
    return (
      <Provider store={store}>
        <div className={SS.App}>
          {!store.ready && <p>Лоадинг...</p>}
          {store.ready && <CMachine />}
        </div>
      </Provider>
    );
  }
}

console.log('Store:', store);
