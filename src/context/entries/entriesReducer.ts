// @scripts
import { Action, Entry } from '../../interfaces';

// @types
export const ADD_ENTRY = 'ADD_ENTRY';
export const DELETE_ENTRY = 'DELETE_ENTRY';
export const UPDATE_ENTRIES = 'UPDATE_ENTRIES';
export const UPDATE_ENTRY = 'UPDATE_ENTRY';
export const UPDATE_STATUS = 'UPDATE_STATUS';

// @interfaces
export interface EntriesState {
  entries: Entry[];
}

export default (state: EntriesState, action: Action) => {
  switch (action.type) {
    case ADD_ENTRY:
      return { ...state, entries: [...state.entries, action.payload] };
    case DELETE_ENTRY:
      return { ...state, entries: state.entries.filter((entry) => entry._id !== action.payload) };
    case UPDATE_ENTRIES:
      return { ...state, entries: [...action.payload] };
    case UPDATE_ENTRY:
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry._id === action.payload.id) {
            return { ...entry, ...action.payload.entry };
          }

          return entry;
        }),
      };
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
