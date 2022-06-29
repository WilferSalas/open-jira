/* eslint-disable implicit-arrow-linebreak */
// @packages
import axios from 'axios';
import { useQuery } from 'react-query';

// @interfaces
import { Entry } from '../interfaces';

const client = '/api';

export const addEntry = (entry: Entry) => axios.post<Entry>(`${client}/entries`, { entry }).then((res) => res.data);

export const updateEntry = (id: Entry['_id'], status: Entry['status']) =>
  axios.put<Entry>(`${client}/entries/${id}`, { status }).then((res) => res.data);

export const deleteEntry = (id: Entry['_id']) =>
  axios.put<Entry>(`${client}/entries/${id}`).then((res) => res.data);

export const useFetchEntries = () =>
  useQuery<Entry[], Error>('getEntries', () =>
    axios.get<Entry[]>(`${client}/entries`).then((res) => res.data));
