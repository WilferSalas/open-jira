// @packages
import { useReducer, useMemo, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';

// #scripts
import EntriesContext from './EntriesContext';
import INITIAL_STATE from '../../config/state/initial-state.json';
import { Children, Entry } from '../../interfaces';
import {
  addEntry,
  deleteEntry,
  updateEntry,
  updateStatus,
  useFetchEntries,
} from '../../api';
import entriesReducer,
{
  ADD_ENTRY,
  EntriesState,
  UPDATE_ENTRIES,
  UPDATE_ENTRY,
  UPDATE_STATUS,
} from './entriesReducer';

const initialState: EntriesState = INITIAL_STATE.entries;

const EntriesProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const { data } = useFetchEntries();
  const { enqueueSnackbar } = useSnackbar();
  const { push } = useRouter();

  useEffect(() => {
    dispatch({ type: UPDATE_ENTRIES, payload: data || [] });
  }, [data]);

  const onAddEntry = async (newEntry: Entry) => {
    try {
      const response = await addEntry(newEntry);
      dispatch({ type: ADD_ENTRY, payload: response });
      enqueueSnackbar('Entry created', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Error creating entry', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const onDeleteEntry = async (id: Entry['_id']) => {
    try {
      await deleteEntry(id);
      dispatch({ type: UPDATE_STATUS, payload: { id } });
      enqueueSnackbar('Entry deleted', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Error deleting entry', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const onUpdateEntry = async (id: Entry['_id'], entry: Entry) => {
    try {
      const response = await updateEntry(id, entry);
      dispatch({ type: UPDATE_ENTRY, payload: { id: response._id, entry: response } });
      push('/');
      enqueueSnackbar('Entry updated', {
        variant: 'success',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    } catch (error) {
      enqueueSnackbar('Error updating entry', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const onUpdateStatus = async (id: Entry['_id'], status: Entry['status']) => {
    try {
      const response = await updateStatus(id, status);
      dispatch({ type: UPDATE_STATUS, payload: { id: response._id, status: response.status } });
    } catch (error) {
      enqueueSnackbar('Error updating status entry', {
        variant: 'error',
        autoHideDuration: 1500,
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
        },
      });
    }
  };

  const contextValue = useMemo(() => ({
    entries: state.entries,
    onAddEntry,
    onDeleteEntry,
    onUpdateEntry,
    onUpdateStatus,
  }), [state]);

  return (
    <EntriesContext.Provider value={contextValue}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
