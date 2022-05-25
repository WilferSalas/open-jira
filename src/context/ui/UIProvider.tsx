// @packages
import { useReducer, useMemo } from 'react';

// @initial-state
import UIContext from './UIContext';

// #scripts
import INITIAL_STATE from '../../config/state/initial-state.json';
import uiReducer, { OPEN_SETTINGS_MENU, UIState } from './uiReducer';
import { Children } from '../../interfaces';

const initialState: UIState = INITIAL_STATE.ui;

const UIProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const onOpenSettingsMenu = () => {
    dispatch({ type: OPEN_SETTINGS_MENU });
  };

  const contextValue = useMemo(() => ({
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
