// @scripts
import { Action } from '../../interfaces';

// @types
export const OPEN_SETTINGS_MENU = 'OPEN_SETTINGS_MENU';

// @interfaces
export interface UIState {
  openSettingsMenu: boolean;
}

export default (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case OPEN_SETTINGS_MENU:
      return { ...state, openSettingsMenu: !state.openSettingsMenu };
    default:
      return state;
  }
};
