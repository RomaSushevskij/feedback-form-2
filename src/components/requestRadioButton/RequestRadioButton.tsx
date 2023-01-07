import { memo } from 'react';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import { RequestRadioButtonProps } from 'components/requestRadioButton/types';

export const RequestRadioButton = memo(({ value, onChange }: RequestRadioButtonProps) => {
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Request status</FormLabel>
      <RadioGroup
        aria-label="requestStatus"
        name="requestStatus-radio-buttons-group"
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="success" control={<Radio />} label="success" />
        <FormControlLabel value="error" control={<Radio />} label="error" />
      </RadioGroup>
    </FormControl>
  );
});
