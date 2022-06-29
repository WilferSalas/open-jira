// @package
import Box from '@mui/material/Box';
import KeyboardCapslockIcon from '@mui/icons-material/KeyboardCapslock';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { indigo, red } from '@mui/material/colors';
import {
  DragEvent,
  FC,
  useContext,
  useState,
} from 'react';

// @scripts
import CardMenu from './CardMenu';
import UIContext from '../../context/ui/UIContext';
import { IconsObject } from '../../interfaces';

// @interfaces
interface Props {
  id: string;
  priority: 'low' | 'medium' | 'high';
  title: string;
}

export const priorityIcons: IconsObject = {
  low: <KeyboardDoubleArrowDownIcon sx={{ color: indigo[400] }} />,
  medium: <KeyboardCapslockIcon />,
  high: <KeyboardDoubleArrowUpIcon sx={{ color: red[400] }} />,
};

const CardItem: FC<Props> = ({ id, title, priority }) => {
  const { isDragging, onDragging } = useContext(UIContext);

  const [showCardMenu, setShowCardMenu] = useState<Boolean>(false);

  const handleOnStartDrag = (event: DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData('text', id);
    onDragging(true);
  };

  const handleOnEndDrag = () => {
    onDragging(false);
  };

  const handleOnShowMenu = (value: boolean) => {
    setShowCardMenu(value);
  };

  return (
    <Paper
      component="div"
      draggable
      onDragEnd={handleOnEndDrag}
      onDragStart={handleOnStartDrag}
      onMouseEnter={() => handleOnShowMenu(true)}
      onMouseLeave={() => handleOnShowMenu(false)}
      variant="outlined"
      sx={{
        cursor: 'pointer',
        minHeight: 100,
        my: 1,
        opacity: isDragging ? 0.6 : 1,
        p: 1,
        position: 'relative',
        transition: 'all .3s',
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{ height: 30 }}
      >
        <Typography sx={{ marginLeft: 0.7 }}>{title}</Typography>
        {showCardMenu && (
          <CardMenu />
        )}
      </Stack>
      <Box sx={{ position: 'absolute', bottom: 0 }}>
        {priorityIcons[priority]}
      </Box>
    </Paper>
  );
};

export default CardItem;
