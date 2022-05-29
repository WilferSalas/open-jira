// @scripts
import { Action } from '../../interfaces';

// @types
export const IS_ADDING_ENTRY = 'IS_ADDING_ENTRY';
export const IS_DRAGGING = 'IS_DRAGGING';
export const OPEN_SETTINGS_MENU = 'OPEN_SETTINGS_MENU';

// @interfaces
export interface UIState {
  isAddingEntry: boolean;
  isDragging: boolean;
  openSettingsMenu: boolean;
}

export default (state: UIState, action: Action): UIState => {
  switch (action.type) {
    case IS_ADDING_ENTRY:
      return { ...state, isAddingEntry: action.payload };
    case IS_DRAGGING:
      return { ...state, isDragging: action.payload };
    case OPEN_SETTINGS_MENU:
      return { ...state, openSettingsMenu: !state.openSettingsMenu };
    default:
      return state;
  }
};
