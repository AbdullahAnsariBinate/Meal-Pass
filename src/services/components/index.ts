import { screens } from '../../screens';
import { services } from '..';
import { IService, PVoid } from '../../utils/types';
import { Explore, Features, Recommended, UserSelector } from '../../components';
import React, { lazy } from 'react';


const Container = lazy(() => import('../../components/core-ui/Container'))
const LogoComponent = lazy(() => import('../../components/core-ui/Logo'))
const Form = lazy(() => import('../../components/core-ui/Form'))
const Button = lazy(() => import('../../components/core-ui/Button'))
const Verification = lazy(() => import('../../components/verification/index'))


export class ComponentService implements IService {
    private inited = false;
    _UserSelector: typeof UserSelector = UserSelector;
    _Container: typeof Container = Container;
    _LogoComponent: typeof LogoComponent = LogoComponent;
    _Form: typeof Form = Form;
    _Button: typeof Button = Button;
    _Explore: typeof Explore = Explore;
    _Features: typeof Features = Features;
    _Recommended: typeof Recommended = Recommended;
    _Verification: typeof Verification = Verification;




    init = async (): PVoid => {
        if (!this.inited) {
            this.setup()
            this.inited = true;
        }
    };



    private setup = () => {

    }
}
