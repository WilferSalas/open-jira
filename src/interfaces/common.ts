// @packages
import { ReactNode } from 'react';

export interface Action {
  type: string,
  payload?: any
}

export interface Children {
  children: ReactNode;
}

export interface ObjectStructure {
  [key: string]: string;
}
