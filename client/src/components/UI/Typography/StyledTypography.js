import Typography from '@mui/material/Typography';

const StyledTypography = ({ style, children }) => {
  if (!style) {
    style = {
      variant: 'body1',
    };
  }
  return <Typography variant={style.variant}>{children}</Typography>;
};

export default StyledTypography;
