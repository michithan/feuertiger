import 'jest-enzyme';
import 'jest-canvas-mock';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { setConfig } from 'next/config';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import config from './next.config';

setConfig(config(PHASE_PRODUCTION_BUILD, {}));
Enzyme.configure({ adapter: new Adapter() });
