// @packages
import Box from '@mui/material/Box';

// @scripts
import Header from '../components/header';
import { Children } from '../interfaces';

// @Interface
interface LayoutProps extends Children {
  onToggleTheme: (userTheme: string) => void;
}

const Layout = ({ children, onToggleTheme }: LayoutProps) => (
  <Box>
    <Header onToggleTheme={onToggleTheme} />
    {children}
  </Box>
);

export default Layout;
