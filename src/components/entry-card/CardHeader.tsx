// @package
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC } from 'react';

// @scripts
import { Entry } from '../../interfaces';

// @interfaces
interface Props {
  entries: Entry[];
  onOpenCardForm: () => void;
  title: 'to do' | 'in progress' | 'done';
  type: Entry['status'];
}

const CardHeader: FC<Props> = ({
  entries,
  onOpenCardForm,
  title,
  type,
}) => (
  <Stack
    alignItems="center"
    direction="row"
    justifyContent="space-between"
  >
    <Box sx={{ my: 1 }}>
      <Typography
        display="inline"
        variant="button"
        sx={{ fontWeight: 700, opacity: 0.7 }}
      >
        {title}
      </Typography>
      <Typography display="inline" sx={{ ml: 0.8, opacity: 0.7 }}>
        {entries.length}
      </Typography>
    </Box>
    {type === 'to-do' && (
      <Tooltip title="Create issue">
        <IconButton onClick={onOpenCardForm}>
          <AddIcon />
        </IconButton>
      </Tooltip>
    )}
  </Stack>
);

export default CardHeader;
