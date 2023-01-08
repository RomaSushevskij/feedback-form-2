import { AlertColor } from '@mui/material/Alert/Alert';

import { SubmitFeedbackFormPayload } from 'api';
import { RequestStatus } from 'components/requestRadioButton';

export type FeedbackFormProps = {
  onSubmit?: (values: SubmitFeedbackFormPayload) => void;
  handleClose?: () => void;
  requestStatus: RequestStatus;
  isSubmitLoading?: boolean;
};

export type FeedbackFormInitialValues = {
  name: string;
  phone: string;
  message: string;
};

export type AlertNotification = {
  message: string | null;
  severity: AlertColor;
};
