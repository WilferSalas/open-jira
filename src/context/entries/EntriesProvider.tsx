// @packages
import { useReducer, useMemo } from 'react';

// #scripts
import EntriesContext from './EntriesContext';
import INITIAL_STATE from '../../config/state/initial-state.json';
import entriesReducer, { ADD_ENTRY, EntriesState } from './entriesReducer';
import { Children, Entry } from '../../interfaces';

const initialState: EntriesState = INITIAL_STATE.entries;

const EntriesProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const onAddEntry = (newEntry: Entry) => {
    dispatch({
      type: ADD_ENTRY,
      payload: newEntry,
    });
  };

  const contextValue = useMemo(() => ({
    entries: state.entries,
    onAddEntry,
  }), [state]);

  return (
    <EntriesContext.Provider value={contextValue}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
