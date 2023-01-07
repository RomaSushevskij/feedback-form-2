import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

// @ts-ignore
export const CustomTextField = styled(TextField)(({ error, theme }) => {
  const successColor = theme.palette.success.main;
  const errorColor = theme.palette.error.main;

  return {
    // input label when focused
    '& label.Mui-focused': {
      color: `${error ? errorColor : successColor}`,
    },
    // focused color for input with variant='standard'
    '& .MuiInput-underline:after': {
      borderBottomColor: `${error ? errorColor : successColor}`,
    },
    // focused color for input with variant='filled'
    '& .MuiFilledInput-underline:after': {
      borderBottomColor: `${error ? errorColor : successColor}`,
    },
    // focused color for input with variant='outlined'
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: `${error ? errorColor : successColor}`,
      },
    },
  };
});
