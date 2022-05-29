// @packages
import { useReducer, useMemo } from 'react';

// #scripts
import INITIAL_STATE from '../../config/state/initial-state.json';
import UIContext from './UIContext';
import uiReducer, {
  IS_ADDING_ENTRY,
  IS_DRAGGING,
  OPEN_SETTINGS_MENU,
  UIState,
} from './uiReducer';
import { Children } from '../../interfaces';

const initialState: UIState = INITIAL_STATE.ui;

const UIProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const onDragging = (isDragging: boolean) => {
    dispatch({ type: IS_DRAGGING, payload: isDragging });
  };

  const onOpenSettingsMenu = () => {
    dispatch({ type: OPEN_SETTINGS_MENU });
  };

  const onIsAddingEntry = (isEntry: boolean) => {
    dispatch({ type: IS_ADDING_ENTRY, payload: isEntry });
  };

  const contextValue = useMemo(() => ({
    isAddingEntry: state.isAddingEntry,
    isDragging: state.isDragging,
    onDragging,
    onIsAddingEntry,
    onOpenSettingsMenu,
    openSettingsMenu: state.openSettingsMenu,
  }), [state]);

  return (
    <UIContext.Provider value={contextValue}>
      {children}
    </UIContext.Provider>
  );
};

export default UIProvider;
