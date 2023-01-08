import { ReactElement } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useTheme } from '@mui/material';

import { EndAdornmentProps } from 'components/endAdornment/types';

export const EndAdornment = ({
  error,
  touched,
}: EndAdornmentProps): ReactElement | null => {
  const { palette } = useTheme();
  const successColor = palette.success.main;
  const errorColor = palette.error.main;

  if (error && touched) {
    return <ErrorOutlineIcon sx={{ color: errorColor }} />;
  }
  if (!error && touched) {
    return <CheckCircleOutlineIcon sx={{ color: successColor }} />;
  }

  return null;
};
