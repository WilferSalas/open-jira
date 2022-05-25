// @scriptsW
import AppBar from '@mui/material/AppBar';
import BallotIcon from '@mui/icons-material/Ballot';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SettingsIcon from '@mui/icons-material/Settings';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';

// @scripts
import DrawerMenu from '../drawer-menu';
import UIContext from '../../context/ui/UIContext';

// @Interface
interface HeaderProps {
  onToggleTheme: (userTheme: string) => void;
}

const Header: FC<HeaderProps> = ({ onToggleTheme }) => {
  const { prefetch, push } = useRouter();

  const { openSettingsMenu, onOpenSettingsMenu } = useContext(UIContext);

  useEffect(() => {
    prefetch('/');
  }, []);

  const handleOnRedirect = () => {
    push('/');
  };

  const handleOnOpenSettings = () => {
    onOpenSettingsMenu();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box
          onClick={handleOnRedirect}
          sx={{ alignItems: 'center', cursor: 'pointer', display: 'flex' }}
        >
          <BallotIcon />
          <Typography sx={{ paddingLeft: 1 }}>Open Jira</Typography>
        </Box>
        <Box>
          <Tooltip title="Settings drawer">
            <IconButton color="inherit" onClick={handleOnOpenSettings}>
              <SettingsIcon />
            </IconButton>
          </Tooltip>
          <DrawerMenu
            onClose={handleOnOpenSettings}
            onToggleTheme={onToggleTheme}
            open={openSettingsMenu}
            position="right"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
