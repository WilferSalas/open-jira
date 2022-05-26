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
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

// @scripts
import { Entry } from '../../interfaces';
import { priorityIcons } from './CardItem';
import { Typography } from '@mui/material';

// @interfaces
interface Props {
  onClose: () => void;
  onSave: () => void;
  openFormIssue: boolean;
  type: Entry['status'];
}

interface FormInput {
  title: string;
  priority: {label: string; value: string };
}

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
  } = useForm();

  const onSubmit: SubmitHandler<FormInput> = (data) => {
    console.log(data);
    onSave();
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
        <Controller
          control={control}
          defaultValue=""
          name="title"
          rules={{ required: true }}
          render={(({ field }) => (
            <TextField
              error={Boolean(errors.title)}
              fullWidth
              placeholder="Add a title..."
              size="small"
              {...register('title', { required: true, minLength: 1 })}
              {...field}
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
                <Select {...field}>
                  {Object.keys(priorityIcons).map((icon) => (
                    <MenuItem key={icon} value={icon}>
                      {priorityIcons[icon]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            ))}
          />
          <Box>
            <Tooltip title="Cancel">
              <IconButton onClick={onClose}>
                <CloseIcon sx={{ color: red[700] }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Save">
              <IconButton onClick={handleSubmit(onSubmit)}>
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
