/**
 * Local theme for Playbook Components (replaces @kitman/playbook/themes).
 * Uses MUI createTheme with design tokens compatible with existing components.
 */
import { createTheme } from '@mui/material/styles';

const rootTheme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      focus: 'rgba(25, 118, 210, 0.08)',
    },
    success: {
      main: '#2e7d32',
    },
    error: {
      main: '#d32f2f',
      light: '#e57373',
    },
    warning: {
      main: '#ed6c02',
      light: '#ffb74d',
      lighter: '#ffe0b2',
    },
  },
});

export { rootTheme };
export default rootTheme;
