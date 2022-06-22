// @packages
import { useReducer, useMemo, useEffect } from 'react';

// #scripts
import EntriesContext from './EntriesContext';
import INITIAL_STATE from '../../config/state/initial-state.json';
import { Children, Entry } from '../../interfaces';
import { useFetchEntries } from '../../api';
import entriesReducer,
{
  ADD_ENTRY,
  EntriesState,
  UPDATE_ENTRIES,
  UPDATE_STATUS,
} from './entriesReducer';

const initialState: EntriesState = INITIAL_STATE.entries;

const EntriesProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const { data } = useFetchEntries();

  useEffect(() => {
    dispatch({ type: UPDATE_ENTRIES, payload: data || [] });
  }, [data]);

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
