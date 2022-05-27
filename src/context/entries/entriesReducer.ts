// @scripts
import { Action, Entry } from '../../interfaces';

// @types
export const ADD_ENTRY = 'ADD_ENTRY';

// @interfaces
export interface EntriesState {
  entries: Entry[];
}

export default (state: EntriesState, action: Action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entries: [...state.entries, action.payload] };
    default:
      return state;
  }
};
