import React, { ChangeEvent, useState } from 'react';

import { Box } from '@mui/material';

import { FeedbackDialog } from 'components/feedbackDialog/FeedbackDialog';
import { RequestRadioButton } from 'components/requestRadioButton/RequestRadioButton';
import { RequestStatus } from 'components/requestRadioButton/types';

const App = () => {
  const [requestRadioButtonValue, setRequestRadioButtonValue] =
    useState<RequestStatus>('success');

  const onRequestRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRequestRadioButtonValue(event.target.value as RequestStatus);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      minHeight="100vh"
      alignItems="center"
      gap={6}
    >
      <FeedbackDialog requestStatus={requestRadioButtonValue} />
      <RequestRadioButton
        value={requestRadioButtonValue}
        onChange={onRequestRadioButtonChange}
      />
    </Box>
  );
};

export default App;
