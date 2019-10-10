import { observable } from 'mobx';

export class Store {
  @observable public cash = 0;
}
