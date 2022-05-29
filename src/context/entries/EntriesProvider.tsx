// @packages
import { useReducer, useMemo } from 'react';

// #scripts
import EntriesContext from './EntriesContext';
import INITIAL_STATE from '../../config/state/initial-state.json';
import entriesReducer, { ADD_ENTRY, EntriesState, UPDATE_STATUS } from './entriesReducer';
import { Children, Entry } from '../../interfaces';

const initialState: EntriesState = INITIAL_STATE.entries;

const EntriesProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const onAddEntry = (newEntry: Entry) => {
    dispatch({ type: ADD_ENTRY, payload: newEntry });
  };

  const onUpdateStatus = (id: Entry['_id'], status: Entry['status']) => {
    dispatch({ type: UPDATE_STATUS, payload: { id, status } });
  };

  const contextValue = useMemo(() => ({
    entries: state.entries,
    onAddEntry,
    onUpdateStatus,
  }), [state]);

  return (
    <EntriesContext.Provider value={contextValue}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
