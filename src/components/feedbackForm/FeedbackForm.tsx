import { memo } from 'react';

import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from 'formik';
import ReactPhoneInput from 'react-phone-input-material-ui';

import { SubmitFeedbackFormPayload } from 'api';
import { CustomTextField } from 'components/customTextFIeld';
import { EndAdornment } from 'components/endAdornment';
import { fieldHelperTextStyle } from 'components/feedbackForm';
import {
  FeedbackFormInitialValues,
  FeedbackFormProps,
} from 'components/feedbackForm/types';
import { getErrorHelperText } from 'utils/formikHelpers';
import { FeedbackFormSchema } from 'utils/validation';

export const FeedbackForm = memo(
  ({ onSubmit, handleClose, requestStatus, isSubmitLoading }: FeedbackFormProps) => {
    const formik = useFormik({
      initialValues: {
        name: '',
        phone: '',
        message: '',
      } as FeedbackFormInitialValues,
      onSubmit: async (values: FeedbackFormInitialValues) => {
        const dataToSend: SubmitFeedbackFormPayload = {
          name: values.name.trim(),
          message: values.message.trim(),
          phone: `+${values.phone}`,
          status: requestStatus,
        };

        if (onSubmit) {
          console.log(dataToSend);
          await onSubmit(dataToSend);
        }
      },
      validationSchema: FeedbackFormSchema,
    });

    const nameErrorHelperText = getErrorHelperText<keyof FeedbackFormInitialValues>(
      formik.errors,
      formik.touched,
      'name',
    );

    const phoneErrorHelperText = getErrorHelperText<keyof FeedbackFormInitialValues>(
      formik.errors,
      formik.touched,
      'phone',
    );

    const messageErrorHelperText = getErrorHelperText<keyof FeedbackFormInitialValues>(
      formik.errors,
      formik.touched,
      'message',
    );

    const { errors, touched } = formik;

    const nameEndAdornment = <EndAdornment error={errors.name} touched={touched.name} />;

    const phoneEndAdornment = (
      <EndAdornment error={errors.phone} touched={touched.phone} />
    );

    const messageEndAdornment = (
      <EndAdornment error={errors.message} touched={touched.message} />
    );

    const isSubmitButtonDisabled =
      nameErrorHelperText ||
      phoneErrorHelperText ||
      messageErrorHelperText ||
      !formik.values.name ||
      !formik.values.phone ||
      !formik.values.message;

    return (
      <form onSubmit={formik.handleSubmit}>
        <DialogContent>
          <DialogContentText marginBottom={2}>
            Пожалуйста, заполните форму
          </DialogContentText>
          <CustomTextField
            {...formik.getFieldProps('name')}
            id="name"
            label="Имя"
            fullWidth
            error={!!nameErrorHelperText}
            InputProps={{
              endAdornment: nameEndAdornment,
            }}
            touched={formik.touched.name?.toString() as 'true' | 'false' | undefined}
            disabled={isSubmitLoading}
          />
          <FormHelperText error sx={fieldHelperTextStyle}>
            {nameErrorHelperText}
          </FormHelperText>
          <ReactPhoneInput
            inputProps={{
              type: 'phone',
              fullWidth: true,
              label: 'Телефон',
              name: 'phone',
              id: 'phone',
              error: !!phoneErrorHelperText,
              InputProps: {
                endAdornment: phoneEndAdornment,
              },
              touched: formik.touched.phone?.toString(),
            }}
            value={formik.values.phone}
            onChange={e => formik.setFieldValue('phone', e)}
            onBlur={() => formik.setTouched({ ...formik.touched, phone: true })}
            component={CustomTextField}
            placeholder="+7 (999) 999-99-99"
            disabled={isSubmitLoading}
          />
          <FormHelperText error sx={fieldHelperTextStyle}>
            {phoneErrorHelperText}
          </FormHelperText>
          <CustomTextField
            {...formik.getFieldProps('message')}
            id="message"
            label="Сообщение"
            fullWidth
            multiline
            rows={4}
            error={!!messageErrorHelperText}
            InputProps={{
              endAdornment: messageEndAdornment,
            }}
            touched={formik.touched.message?.toString() as 'true' | 'false' | undefined}
            disabled={isSubmitLoading}
          />
          <FormHelperText error sx={fieldHelperTextStyle}>
            {messageErrorHelperText}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <LoadingButton
            loading={isSubmitLoading}
            endIcon={<SendIcon />}
            disabled={!!isSubmitButtonDisabled}
            type="submit"
            variant="contained"
          >
            Submit
          </LoadingButton>
        </DialogActions>
      </form>
    );
  },
);
