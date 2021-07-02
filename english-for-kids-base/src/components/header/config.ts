import { IConfig } from '../../types/interfaces';
import { runCheckBoxHandlers } from './helpers/check-box-handlers';
import { runLogoHandlers } from './helpers/logo-handlers';
import { runMenuButtonHandlers } from './helpers/menu-button-handlers';
import { CHECKBOX, LOGO, MENU_BUTTON } from './ids';

export const config: IConfig = {
  [CHECKBOX]: runCheckBoxHandlers,
  [LOGO]: runLogoHandlers,
  [MENU_BUTTON]: runMenuButtonHandlers,
};
