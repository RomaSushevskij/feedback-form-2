import { SubmitFeedbackFormPayload } from 'api/types';
import { feedbackFormMessages } from 'enums/feedbackFormMessages';

export const feedbackFormApi = {
  submitForm(payload: SubmitFeedbackFormPayload) {
    const { status } = payload;

    return new Promise<{ message: string }>((res, rej) => {
      const ms = 1000;

      setTimeout(() => {
        if (status === 'success') {
          res({ message: feedbackFormMessages.submitSuccess });
        }

        rej(new Error(feedbackFormMessages.submitError));
      }, ms);
    });
  },
};
