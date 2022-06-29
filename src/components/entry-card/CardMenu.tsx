// @packages
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {
  FC,
  MouseEvent,
  useContext,
  useState,
} from 'react';

// @scripts
import EntriesContext from '../../context/entries/EntriesContext';

interface CardMenuProps {
  entryId: string,
}

const CardMenu: FC<CardMenuProps> = ({ entryId }) => {
  const { onDeleteEntry } = useContext(EntriesContext);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOnDelete = () => {
    onDeleteEntry(entryId);
  };

  return (
    <Box>
      <IconButton
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
        open={open}
        PaperProps={{
          style: {
            width: '15ch',
            padding: 0,
          },
        }}
      >
        <MenuItem onClick={handleOnDelete}>
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default CardMenu;
