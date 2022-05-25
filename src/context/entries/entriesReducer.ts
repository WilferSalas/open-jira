// @scripts
import { Action, Entry } from '../../interfaces';

// @types
export const TYPE = 'TYPE';

// @interfaces
export interface EntriesState {
  entries: Entry[];
}

export default (state: EntriesState, action: Action) => {
  switch (action.type) {
    default:
      return state;
  }
};
