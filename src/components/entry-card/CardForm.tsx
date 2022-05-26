// @package
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { FC, useState, ChangeEvent } from 'react';
import { red, green } from '@mui/material/colors';

// @scripts
import { Entry } from '../../interfaces';
import { priorityIcons } from './CardItem';

// @interfaces
interface Props {
  onClose: () => void;
  onSave: () => void;
  openFormIssue: boolean;
  type: Entry['status'];
}

const CardForm: FC<Props> = ({
  onClose,
  onSave,
  openFormIssue,
  type,
}) => {
  const [value, setValue] = useState('');
  const [select, setSelect] = useState('medium');

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleOnSelect = (event: SelectChangeEvent) => {
    setSelect(event.target.value as string);
  };

  return (
    <Box>
      {(type === 'to-do' && openFormIssue) && (
      <Paper
        sx={{
          minHeight: 100,
          my: 1,
          p: 1,
          position: 'relative',
        }}
        variant="outlined"
      >
        <TextField
          fullWidth
          onChange={handleOnChange}
          placeholder="Add a title..."
          size="small"
          value={value}
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <FormControl size="small">
            <Select onChange={handleOnSelect} value={select}>
              {Object.keys(priorityIcons).map((icon) => (
                <MenuItem key={icon} value={icon}>
                  {priorityIcons[icon]}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box>
            <Tooltip title="Cancel">
              <IconButton onClick={onClose}>
                <CloseIcon sx={{ color: red[700] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton onClick={onSave}>
                <CheckIcon sx={{ color: green[700] }} />
              </IconButton>
            </Tooltip>
          </Box>
        </Stack>
      </Paper>
      )}
    </Box>
  );
};

export default CardForm;
