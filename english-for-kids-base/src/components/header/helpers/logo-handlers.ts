import { changeHash } from '../../../router/change-hash';
import { MAIN_PAGE } from '../../main-page/config';

export const runLogoHandlers = (): void => changeHash(MAIN_PAGE);
