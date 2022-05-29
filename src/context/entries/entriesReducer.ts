// @scripts
import { Action, Entry } from '../../interfaces';

// @types
export const ADD_ENTRY = 'ADD_ENTRY';
export const UPDATE_STATUS = 'UPDATE_STATUS';

// @interfaces
export interface EntriesState {
  entries: Entry[];
}

export default (state: EntriesState, action: Action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entries: [...state.entries, action.payload] };
    case UPDATE_STATUS:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload.id) {
            return { ...entry, status: action.payload.status };
          }

          return entry;
        }),
      };
    default:
      return state;
  }
};
