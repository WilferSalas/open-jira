// @packages
import { createContext } from 'react';

// @scripts
import { Entry } from '../../interfaces';

// @interfaces
export interface EntriesContextProps {
  entries: Entry[]
}

const EntriesContext = createContext({} as EntriesContextProps);

export default EntriesContext;
