import { FeedbackFormInitialValues } from 'components/feedbackForm/types';

export type SubmitFeedbackFormPayload = FeedbackFormInitialValues & {
  status: 'success' | 'error';
};
