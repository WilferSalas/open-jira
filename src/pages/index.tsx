// @package
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { FC, useContext } from 'react';

// @scripts
import EntriesContext from '../context/entries/EntriesContext';
import EntryCard from '../components/entry-card';

const Home: FC = () => {
  const { entries } = useContext(EntriesContext);

  return (
    <Container maxWidth="lg" sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <EntryCard entries={entries} title="to do" type="to-do" />
        <EntryCard entries={entries} title="in progress" type="in-progress" />
        <EntryCard entries={entries} title="done" type="done" />
      </Grid>
    </Container>
  );
};

export default Home;
