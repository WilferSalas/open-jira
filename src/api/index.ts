/* eslint-disable implicit-arrow-linebreak */
// @packages
import axios from 'axios';
import { useQuery } from 'react-query';

// @interfaces
import { Entry } from '../interfaces';

const entriesApi = axios.create({
  baseURL: '/api',
});

export const addEntry = (entry: Entry) => entriesApi.post<Entry>('/entries', { entry }).then((res) => res.data);

export const updateEntry = (id: Entry['_id'], entry: Entry) =>
  entriesApi.put<Entry>(`/entries/${id}`, { entry }).then((res) => res.data);

export const updateStatus = (id: Entry['_id'], status: Entry['status']) =>
  entriesApi.put<Entry>(`/entries/${id}`, { status }).then((res) => res.data);

export const deleteEntry = (id: Entry['_id']) =>
  entriesApi.delete<Entry>(`/entries/${id}`).then((res) => res.data);

export const getEntry = (id: string) =>
  entriesApi.get<Entry>(`/entries/${id}`).then((res) => res.data);

export const useFetchEntries = () =>
  useQuery<Entry[], Error>('getEntries', () =>
    entriesApi.get<Entry[]>('entries').then((res) => res.data));

export const useFetchEntry = (id: string) =>
  useQuery<Entry, Error>('getEntry', () =>
    entriesApi.get<Entry>(`/entries/${id}`).then((res) => res.data));
