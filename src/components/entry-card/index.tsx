// @package
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import {
  DragEvent,
  FC,
  useContext,
  useMemo,
} from 'react';
import { grey } from '@mui/material/colors';

// @scripts
import CardForm from './CardForm';
import CardHeader from './CardHeader';
import CardItem from './CardItem';
import EntriesContext from '../../context/entries/EntriesContext';
import UIContext from '../../context/ui/UIContext';
import { Entry } from '../../interfaces';
import { getTheme } from '../../utils';

// @interfaces
interface EntryCardProps {
  entries: Entry[];
  title: 'to do' | 'in progress' | 'done';
  type: Entry['status']
}

const EntryCard: FC<EntryCardProps> = ({ entries, title, type }) => {
  const { onAddEntry, onUpdateStatus } = useContext(EntriesContext);
  const { onIsAddingEntry, isAddingEntry, onDragging } = useContext(UIContext);

  const isDarkMode = getTheme() === 'dark' || getTheme() === 'system';
  const entriesData = useMemo(() => entries.filter((entry) => entry.status === type), [entries]);

  const handleOnopenCardForm = () => {
    onIsAddingEntry(true);
  };

  const handleOnCloseIssue = () => {
    onIsAddingEntry(false);
  };

  const handleOnSaveIssue = (entry: Entry) => {
    onAddEntry(entry);
    onIsAddingEntry(false);
  };

  const handleOnDrop = (event: DragEvent<HTMLDivElement>) => {
    const id = event.dataTransfer.getData('text');

    onUpdateStatus(id, type);
    onDragging(false);
  };

  const handleOnAllowDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <Grid
      onDrop={handleOnDrop}
      onDragOver={handleOnAllowDrop}
      component="div"
      item
      md={4}
      xs={12}
    >
      <Paper
        square
        sx={{
          background: isDarkMode ? grey[900] : grey[200],
          minHeight: 'calc(100vh - 100px)',
          p: 1,
        }}
        variant="outlined"
      >
        <CardHeader
          entries={entriesData}
          onOpenCardForm={handleOnopenCardForm}
          title={title}
          type={type}
        />
        <CardForm
          onClose={handleOnCloseIssue}
          onSave={handleOnSaveIssue}
          openFormIssue={isAddingEntry}
          type={type}
        />
        {entriesData.map((entry) => (
          <CardItem
            id={entry._id}
            key={entry._id}
            priority={entry.priority}
            title={entry.title}
          />
        ))}
      </Paper>
    </Grid>
  );
};

export default EntryCard;
