// @packages
import { useReducer, useMemo } from 'react';
import { v4 as uuidv4 } from 'uuid';

// #scripts
import EntriesContext from './EntriesContext';
import INITIAL_STATE from '../../config/state/initial-state.json';
import entriesReducer, { EntriesState } from './entriesReducer';
import { Children } from '../../interfaces';

const initialState: EntriesState = {
  entries: [
    {
      _id: uuidv4(),
      createdAt: Date.now(),
      description: 'Description 1',
      priority: 'medium',
      status: 'to-do',
      title: 'Title 1',
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 1000000,
      description: 'Description 2',
      priority: 'low',
      status: 'in-progress',
      title: 'Title 2',
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 100000,
      description: 'Description 3',
      priority: 'high',
      status: 'done',
      title: 'Title 3',
    },
    {
      _id: uuidv4(),
      createdAt: Date.now() - 100000,
      description: 'Description 4',
      priority: 'high',
      status: 'to-do',
      title: 'Title 4',
    },
  ],
};

const EntriesProvider = ({ children }: Children) => {
  const [state, dispatch] = useReducer(entriesReducer, initialState);

  const contextValue = useMemo(() => ({
    ...state,
  }), [state]);

  return (
    <EntriesContext.Provider value={contextValue}>
      {children}
    </EntriesContext.Provider>
  );
};

export default EntriesProvider;
