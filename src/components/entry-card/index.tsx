// @package
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FC, ReactElement } from 'react';
import { grey, indigo, red } from '@mui/material/colors';

// @scripts
import { Entry } from '../../interfaces';
import { getTheme } from '../../utils';

// @interfaces
interface EntryCardProps {
  entries: Entry[];
  title: 'to do' | 'in progress' | 'done';
  type: Entry['status']
}

interface IconsObject {
  [key: string]: ReactElement;
}

const EntryCard: FC<EntryCardProps> = ({ entries, title, type }) => {
  const isDarkMode = getTheme() === 'dark' || getTheme() === 'system';
  const entriesData = entries.filter((entry) => entry.status === type);

  const getPriorityIcon = (priority: string) => {
    const priorityIcons: IconsObject = {
      low: <KeyboardDoubleArrowDownIcon sx={{ color: indigo[400] }} />,
      medium: <KeyboardCapslockIcon />,
      high: <KeyboardDoubleArrowUpIcon sx={{ color: red[400] }} />,
    };

    return priorityIcons[priority];
  };

  return (
    <Grid item xs={12} md={4}>
      <Paper
        square
        sx={{
          background: isDarkMode ? grey[900] : grey[200],
          height: 'calc(100vh - 90px)',
          p: 1,
        }}
        variant="outlined"
      >
        <Box sx={{ mb: 1 }}>
          <Typography
            display="inline"
            variant="button"
            sx={{ fontWeight: 700, opacity: 0.7 }}
          >
            {title}
          </Typography>
          <Typography display="inline" sx={{ ml: 0.8, opacity: 0.7 }}>
            {entriesData.length}
          </Typography>
        </Box>
        {entriesData.map((entry) => (
          <Paper
            key={entry.title}
            sx={{
              cursor: 'pointer',
              minHeight: 100,
              my: 1,
              p: 1,
              position: 'relative',
            }}
            variant="outlined"
          >
            <Typography>{entry.title}</Typography>
            <Box sx={{ position: 'absolute', bottom: 0 }}>
              {getPriorityIcon(entry.priority)}
            </Box>
          </Paper>
        ))}
      </Paper>
    </Grid>
  );
};

export default EntryCard;
