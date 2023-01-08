import { memo, useCallback, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import { FeedbackDialogProps } from './types';

import { feedbackFormApi, SubmitFeedbackFormPayload } from 'api';
import { AlertNotification, FeedbackForm } from 'components/feedbackForm';
import { SnackBar } from 'components/snackBar';

export const FeedbackDialog = memo(({ requestStatus }: FeedbackDialogProps) => {
  const [open, setOpen] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<AlertNotification | null>(null);
  const [isRequestLoading, setRequestLoading] = useState(false);

  const onDialogOpen = () => {
    setOpen(true);
  };

  const onDialogClose = () => {
    setOpen(false);
  };

  const onSnackBarClose = useCallback((closeValue: null) => {
    setSubmitMessage(closeValue);
  }, []);

  const submitFeedbackForm = async (values: SubmitFeedbackFormPayload) => {
    try {
      setRequestLoading(true);
      const { message } = await feedbackFormApi.submitForm(values);

      setSubmitMessage({ message, severity: 'success' });
      setOpen(false);
    } catch (e) {
      const { message } = e as Error;

      setSubmitMessage({ message, severity: 'error' });
    } finally {
      setRequestLoading(false);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={onDialogOpen}>
        Open form dialog
      </Button>
      <Dialog fullWidth open={open} onClose={onDialogClose}>
        <DialogTitle>Форма обратной связи</DialogTitle>
        <FeedbackForm
          onSubmit={submitFeedbackForm}
          handleClose={onDialogClose}
          requestStatus={requestStatus}
          isSubmitLoading={isRequestLoading}
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
