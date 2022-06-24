/* eslint-disable implicit-arrow-linebreak */
// @packages
import axios from 'axios';
import { useQuery } from 'react-query';

// @interfaces
import { Entry } from '../interfaces';

const client = '/api';

export const AddEntry = (entry: Entry) => axios.post<Entry>(`${client}/entries`, { entry }).then((res) => res.data);

export const useFetchEntries = () =>
  useQuery<Entry[], Error>('getEntries', () =>
    axios.get<Entry[]>(`${client}/entries`).then((res) => res.data));
