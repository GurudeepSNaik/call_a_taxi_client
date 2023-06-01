import { Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const Logo = () => {
  const theme = useTheme();
  const fillColor = theme.palette.primary.light;

  return (
    <img
    width="200px"
    height="140px"
    alt="Logo"
    src="/favicon-32x32.png"
    style={{
      margin:"10px auto"
    }}
  />
  );
};
