// @package
import Box from '@mui/material/Box';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { indigo, red } from '@mui/material/colors';

// @scripts
import { IconsObject } from '../../interfaces';

// @interfaces
interface Props {
  title: string;
  priority: 'low' | 'medium' | 'high';
}

export const priorityIcons: IconsObject = {
  low: <KeyboardDoubleArrowDownIcon sx={{ color: indigo[400] }} />,
  medium: <KeyboardCapslockIcon />,
  high: <KeyboardDoubleArrowUpIcon sx={{ color: red[400] }} />,
};

const CardItem: FC<Props> = ({ title, priority }) => (
  <Paper
    sx={{
      cursor: 'pointer',
      minHeight: 100,
      my: 1,
      p: 1,
      position: 'relative',
    }}
    variant="outlined"
  >
    <Typography>{title}</Typography>
    <Box sx={{ position: 'absolute', bottom: 0 }}>
      {priorityIcons[priority]}
    </Box>
  </Paper>
);

export default CardItem;
