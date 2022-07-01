// @packages
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui//material/Container';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect } from 'react';
import { GetServerSidePropsContext } from 'next';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useRouter } from 'next/router';

// @scripts
import { useFetchEntry } from '../../api';
import { priorityIcons } from '../../components/entry-card/CardItem';
import { Entry } from '../../interfaces';

interface Inputs {
  title: string,
  description: string,
  priority: Entry['priority'],
}

const CustomTextField = styled(TextField)({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  },
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: 5,
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
    paddingLeft: 0,
  },
});

const CardEditItem: FC = () => {
  const { query: { id } } = useRouter();

  const { data } = useFetchEntry(id as string || '');
  const { push } = useRouter();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
    reset,
  } = useForm<Inputs>(({
    defaultValues: {
      title: data?.title,
      description: data?.description || '',
      priority: data?.priority,
    },
  }));

  useEffect(() => () => {
    reset();
  }, [data]);

  const handleOnSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
  };

  const handleOnCancel = () => {
    push('/');
  };

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
          <Typography sx={{ fontWeight: 600 }}>
            Entry:
          </Typography>
          <Controller
            control={control}
            name="title"
            rules={{ required: true }}
            render={(({ field }) => (
              <CustomTextField
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
        </Box>
        <Box sx={{ my: 2 }}>
          <Typography sx={{ fontWeight: 600 }}>
            Description:
          </Typography>
          <Controller
            control={control}
            name="description"
            render={(({ field }) => (
              <CustomTextField
                fullWidth
                placeholder="Add a description..."
                size="small"
                {...field}
              />
            ))}
          />
        </Box>
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            Priority:
          </Typography>
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
        </Box>
        <Stack
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
          spacing={2}
        >
          <Button onClick={handleOnCancel} variant="outlined">Cancel</Button>
          <Button
            disabled={!isDirty}
            onClick={handleSubmit(handleOnSubmit)}
            type="submit"
            variant="contained"
          >
            Save
          </Button>
        </Stack>
      </Paper>
    </Container>
  );
};

// export const getServerSideProps: GetServerSidePropsContext = async ({ params }) => {
//   const { id } = params as { id: string };

//   return {
//     props: {
//       id,
//     },
//   };
// };

export default CardEditItem;
