import Typography from '@mui/material/Typography';

const StyledTypography = ({ style, children }) => {
  return <Typography variant={style.variant || 'body1'}>{children}</Typography>;
};

export default StyledTypography;
