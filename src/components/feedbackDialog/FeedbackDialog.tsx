import { memo, useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { feedbackFormApi, SubmitFeedbackFormPayload } from 'api';
import { FeedbackDialogProps } from 'components/feedbackDialog/types';
import { FeedbackForm } from 'components/feedbackForm';
import { AlertNotification } from 'components/feedbackForm/types';
import { SnackBar } from 'components/snackBar';

export const FeedbackDialog = memo(({ requestStatus }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<AlertNotification | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSnackBarClose = useCallback((closeValue: null) => {
    setSubmitMessage(closeValue);
  }, []);

  const submitFeedbackForm = async (values: SubmitFeedbackFormPayload) => {
    try {
      const { message } = await feedbackFormApi.submitForm(values);

      setSubmitMessage({ message, severity: 'success' });
    } catch (e) {
      const { message } = e as Error;

      setSubmitMessage({ message, severity: 'error' });
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Форма обратной связи</DialogTitle>
        <FeedbackForm
          onSubmit={submitFeedbackForm}
          handleClose={handleClose}
          requestStatus={requestStatus}
        />
      </Dialog>
      {submitMessage && (
        <SnackBar
          message={submitMessage.message}
          severity={submitMessage.severity}
          autoHideDuration={7000}
          onClose={onSnackBarClose}
        />
      )}
    </div>
  );
});
