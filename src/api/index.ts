/* eslint-disable implicit-arrow-linebreak */
// @packages
import axios from 'axios';
import { useQuery } from 'react-query';

// @interfaces
import { Entry } from '../interfaces';

const client = 'http://localhost:3000/api';

export const addEntry = (entry: Entry) => axios.post<Entry>(`${client}/entries`, { entry }).then((res) => res.data);

export const updateEntry = (id: Entry['_id'], entry: Entry) =>
  axios.put<Entry>(`${client}/entries/${id}`, { entry }).then((res) => res.data);

export const updateStatus = (id: Entry['_id'], status: Entry['status']) =>
  axios.put<Entry>(`${client}/entries/${id}`, { status }).then((res) => res.data);

export const deleteEntry = (id: Entry['_id']) =>
  axios.delete<Entry>(`${client}/entries/${id}`).then((res) => res.data);

export const getEntry = (id: string) =>
  axios.get<Entry>(`${client}/entries/${id}`).then((res) => res.data);

export const useFetchEntries = () =>
  useQuery<Entry[], Error>('getEntries', () =>
    axios.get<Entry[]>(`${client}/entries`).then((res) => res.data));

export const useFetchEntry = (id: string) =>
  useQuery<Entry, Error>('getEntry', () =>
    axios.get<Entry>(`${client}/entries/${id}`).then((res) => res.data));
