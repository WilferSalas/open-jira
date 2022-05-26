// @package
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { FC, useMemo, useState } from 'react';
import { grey } from '@mui/material/colors';

// @scripts
import CardForm from './CardForm';
import CardHeader from './CardHeader';
import CardItem from './CardItem';
import { Entry } from '../../interfaces';
import { getTheme } from '../../utils';

// @interfaces
interface EntryCardProps {
  entries: Entry[];
  title: 'to do' | 'in progress' | 'done';
  type: Entry['status']
}

const EntryCard: FC<EntryCardProps> = ({ entries, title, type }) => {
  const [openCardForm, setOpenCardForm] = useState(false);
  const isDarkMode = getTheme() === 'dark' || getTheme() === 'system';
  const entriesData = useMemo(() => entries.filter((entry) => entry.status === type), [entries]);

  const handleOnopenCardForm = () => {
    setOpenCardForm(true);
  };

  const handleOnCloseIssue = () => {
    setOpenCardForm(false);
  };

  const handleOnSaveIssue = () => {
    setOpenCardForm(true);
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper
        square
        sx={{
          background: isDarkMode ? grey[900] : grey[200],
          minHeight: 'calc(100vh - 90px)',
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
          openFormIssue={openCardForm}
          type={type}
        />
        {entriesData.map((entry) => (
          <CardItem key={entry.title} title={entry.title} priority={entry.priority} />
        ))}
      </Paper>
    </Grid>
  );
};

export default EntryCard;
