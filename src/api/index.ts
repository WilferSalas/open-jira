/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable import/prefer-default-export */
// @packages
import axios from 'axios';
import { useQuery } from 'react-query';

// @interfaces
import { Entry } from '../interfaces';

const client = '/api';

export const useFetchEntries = () =>
  useQuery<Entry[], Error>('getEntries', () =>
    axios.get<Entry[]>(`${client}/entries`).then((res) => res.data));
