// @packages
import { ReactElement, ReactNode } from 'react';

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

export interface IconsObject {
  [key: string]: ReactElement;
}
