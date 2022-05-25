// @scriptsW
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';
import { FC, useState, MouseEvent } from 'react';
import { getTheme } from '../../utils';

// @interfaces
export interface MenuProps {
  onClose: () => void;
  onToggleTheme: (userTheme: string) => void;
  open: boolean;
  position: 'left' | 'top' | 'right' | 'bottom' | undefined;
}

const DrawerMenu: FC<MenuProps> = ({
  onClose,
  onToggleTheme,
  open,
  position,
}) => {
  const [alignment, setAlignment] = useState<string>(getTheme());

  const handleChange = (event: MouseEvent<HTMLElement>, newAlignment: string) => {
    if (newAlignment) {
      setAlignment(newAlignment);
      onToggleTheme(newAlignment);
    }
  };

  return (
    <Drawer
      anchor={position}
      open={open}
      onClose={onClose}
    >
      <Box sx={{ width: 300 }}>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{ px: 1, py: 1.7 }}
        >
          <Typography variant="h6">Settings</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Box>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ p: 1 }}>
        <Typography display="block" gutterBottom variant="button">Mode</Typography>
        <ToggleButtonGroup
          color="primary"
          exclusive
          fullWidth
          onChange={handleChange}
          value={alignment}
        >
          <ToggleButton value="light">
            <LightModeIcon sx={{ mr: 1 }} />
            {' '}
            Light
          </ToggleButton>
          <ToggleButton value="system">
            <SettingsBrightnessIcon sx={{ mr: 1 }} />
            {' '}
            System
          </ToggleButton>
          <ToggleButton value="dark">
            <DarkModeOutlinedIcon sx={{ mr: 1 }} />
            {' '}
            Dark
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
