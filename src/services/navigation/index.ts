import { navDefaultOptions, withTitle } from './options';
import { screens } from '../../screens';
import { services } from '..';
import { IService, PVoid, VoidAction } from '../../utils/types';
import { ReactElement } from 'react';

export class NavService implements IService {
  private inited = false;
  private bottomTabInstance: { open: any, close: any, onRegisteredAction: (title: string | ReactElement, delegate: VoidAction) => void, onRemoveAction: () => void } | undefined;




  showBottomTab = () => {
    if (this.bottomTabInstance) {
      this.bottomTabInstance?.open();
    }
  }

  hideBottomTab = () => {
    if (this.bottomTabInstance) {
      this.bottomTabInstance?.close();
    }
  }


  setBottomTabReference = (instance: typeof this.bottomTabInstance) => {
    this.bottomTabInstance = instance;
  }

  setBottomTabAction = (title: string | ReactElement, delegate: VoidAction) => {
    this.bottomTabInstance?.onRegisteredAction(title, delegate);
  }


  removeBottomTabAction = () => {
    this.bottomTabInstance?.onRemoveAction();
  }


  init = async (): PVoid => {
    if (!this.inited) {
      this.setOptions();

      this.inited = true;
    }
  };



  private setOptions = (): void => {
    // -- setting common default options
    screens.N.setDefaultOptions(navDefaultOptions());

    // -- setting screen-based specific options
    // for ex., if you want to use translate service
    screens.mergeOptions('Main', {
      topBar: {
        ...withTitle(services.t.do('home.title')),
      },
    });
  };
}
