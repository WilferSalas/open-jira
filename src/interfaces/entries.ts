export interface Entry {
  _id: string;
  createdAt: number;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'to-do' | 'in-progress' | 'done';
  title: string;
}

export interface Entries {
  entries: Entry[];
  onAddEntry: (newEntry: Entry) => void;
  onUpdateStatus: (id: string, status: Entry['status']) => void;
}
