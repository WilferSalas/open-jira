// @package
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { FC } from 'react';
import { red, green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// @scripts
import { Entry } from '../../interfaces';
import { priorityIcons } from './CardItem';

// @interfaces
interface Props {
  onClose: () => void;
  onSave: (entry: Entry) => void;
  openFormIssue: boolean;
  type: Entry['status'];
}

interface Inputs {
  title: string,
  priority: Entry['priority'],
}

const CustomTextField = styled(TextField)({
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiInput-underline:after': {
    border: 'none',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: 'none',
    },
    '&:hover fieldset': {
      border: 'none',
    },
    '&.Mui-focused fieldset': {
      border: 'none',
    },
  },
});

const CustomSelect = styled(Select)({
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '& .MuiSelect-select': {
    height: '0 !important',
  },
});

const CardForm: FC<Props> = ({
  onClose,
  onSave,
  openFormIssue,
  type,
}) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>();

  const handleOnSubmit: SubmitHandler<Inputs> = (data) => {
    const newEntry: Entry = {
      createdAt: Date.now(),
      priority: data.priority,
      status: 'to-do',
      title: data.title,
    };

    reset();
    onSave(newEntry);
  };

  const handleOnClose = () => {
    reset();
    onClose();
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
      {(type === 'to-do' && openFormIssue) && (
      <Paper
        sx={{
          minHeight: 100,
          my: 1,
          position: 'relative',
          border: '1.5px solid',
          borderColor: 'primary.main',
        }}
        variant="outlined"
      >
        <Controller
          control={control}
          defaultValue=""
          name="title"
          rules={{ required: true }}
          render={(({ field }) => (
            <CustomTextField
              autoFocus
              error={Boolean(errors.title)}
              fullWidth
              helperText={Boolean(errors.title) && 'Add a title'}
              placeholder="What needs to be done?"
              size="small"
              {...field}
              {...register('title', { required: true, minLength: 1 })}
            />
          ))}
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{ mt: 2 }}
        >
          <Controller
            control={control}
            defaultValue="medium"
            name="priority"
            render={(({ field }) => (
              <FormControl size="small">
                <CustomSelect {...field}>
                  {Object.keys(priorityIcons).map((icon) => (
                    <MenuItem key={icon} value={icon}>
                      {priorityIcons[icon]}
                    </MenuItem>
                  ))}
                </CustomSelect>
              </FormControl>
            ))}
          />
          <Box sx={{ marginRight: 1 }}>
            <Tooltip title="Cancel">
              <IconButton onClick={handleOnClose}>
                <CloseIcon fontSize="small" sx={{ color: red[700] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton type="submit">
                <CheckIcon fontSize="small" sx={{ color: green[700] }} />
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
