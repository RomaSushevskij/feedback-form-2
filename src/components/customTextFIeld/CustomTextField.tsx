import { useMemo } from 'react';

import { styled } from '@mui/material';
import TextField from '@mui/material/TextField';

export const CustomTextField = styled(TextField)<{ isTouched?: boolean }>(
  ({ error, theme, isTouched }) => {
    const successColor = theme.palette.success.main;
    const errorColor = theme.palette.error.main;
    const primaryColor = theme.palette.primary.main;

    const resultInputColor = useMemo(() => {
      if (error) return errorColor;
      if (isTouched) return successColor;

      return primaryColor;
    }, [error, errorColor, isTouched, primaryColor, successColor]);

    return {
      // input label when focused
      '& label.Mui-focused': {
        color: resultInputColor,
      },
      // focused color for input with variant='standard'
      '& .MuiInput-underline:after': {
        borderBottomColor: resultInputColor,
      },
      // focused color for input with variant='filled'
      '& .MuiFilledInput-underline:after': {
        borderBottomColor: resultInputColor,
      },
      // focused color for input with variant='outlined'
      '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset': {
          // eslint-disable-next-line no-nested-ternary
          borderColor: resultInputColor,
        },
      },
    };
  },
);
