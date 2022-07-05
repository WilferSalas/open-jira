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
import { GetServerSideProps } from 'next';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router';

// @scripts
import Loading from '../../components/loading';
import { Entry } from '../../interfaces';
import { priorityIcons } from '../../components/entry-card/CardItem';
import { useFetchEntry } from '../../api';
import NotFound from '../../components/not-found';

interface Inputs {
  title: string,
  description: string,
  priority: Entry['priority'],
}

const CustomTextField = styled(TextField)({
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '& label.Mui-focused': {
    border: 'none',
  },
  '& .MuiOutlinedInput-input': {
    paddingLeft: 3,
  },
  '& .MuiInputBase-multiline': {
    paddingLeft: 0,
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
    paddingLeft: 1,
  },
});

interface CardEditItemProps {
  id: string,
}

const CardEditItem: FC<CardEditItemProps> = ({ id }) => {
  const { data, error, isLoading } = useFetchEntry(id);
  const { push } = useRouter();

  const queryClient = useQueryClient();

  const {
    control,
    formState: { errors, isDirty },
    handleSubmit,
    register,
  } = useForm<Inputs>();

  useEffect(() => () => {
    queryClient.removeQueries('getEntry');
  }, []);

  const handleOnSubmit: SubmitHandler<Inputs> = () => {
    // TODO: for logic to update
  };

  const handleOnCancel = () => {
    push('/');
  };

  if (!data && isLoading) return <Loading size={50} />;
  if (error) return <NotFound />;

  return (
    <Container maxWidth="md" sx={{ my: 2 }}>
      <Paper sx={{ p: 2 }}>
        <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}>
          <Typography sx={{ fontWeight: 600 }}>
            Entry:
          </Typography>
          <Controller
            control={control}
            defaultValue={data?.title}
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
            defaultValue={data?.description}
            name="description"
            render={(({ field }) => (
              <CustomTextField
                fullWidth
                multiline
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
            defaultValue={data?.priority}
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string };

  return {
    props: {
      id,
    },
  };
};

export default CardEditItem;
