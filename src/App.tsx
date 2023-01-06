import React from 'react';

import { Box } from '@mui/material';

import { FeedbackForm } from 'components/feedbackForm';

const App = () => {
  return (
    <Box display="flex" justifyContent="center" minHeight="100vh" alignItems="center">
      <FeedbackForm />
    </Box>
  );
};

export default App;
