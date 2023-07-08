import { IService, PVoid } from '../../utils/types';
import { AuthenticationApi } from './authentication';
import {CounterApi} from './counter';

export class ApiService implements IService {
  private inited = false;

  counter: CounterApi;
  auth: AuthenticationApi;

  
  constructor() {
    this.counter = new CounterApi();
    this.auth = new AuthenticationApi();

  }

  init = async (): PVoid => {
    if (!this.inited) {
      // your code ...

      this.inited = true;
    }
  };
}
