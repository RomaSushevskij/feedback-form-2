import { memo, useMemo } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormHelperText, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { useFormik } from 'formik';
import ReactPhoneInput from 'react-phone-input-material-ui';

import { SubmitFeedbackFormPayload } from 'api';
import { CustomTextField } from 'components/customTextFIeld/CustomTextField';
import { fieldHelperTextStyle } from 'components/feedbackForm/styles';
import {
  FeedbackFormInitialValues,
  FeedbackFormProps,
} from 'components/feedbackForm/types';
import { getErrorHelperText } from 'utils/formikHelpers';
import { FeedbackFormSchema } from 'utils/validation';

export const FeedbackForm = memo(
  ({ onSubmit, handleClose, requestStatus }: FeedbackFormProps) => {
    const { palette } = useTheme();
    const successColor = palette.success.main;
    const errorColor = palette.error.main;

    const formik = useFormik({
      initialValues: {
        name: '',
        phone: '',
        message: '',
      } as FeedbackFormInitialValues,
      onSubmit: async (values: FeedbackFormInitialValues) => {
        const dataToSend: SubmitFeedbackFormPayload = {
          ...values,
          phone: `+${values.phone}`,
          status: requestStatus,
        };

        if (onSubmit) {
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

    const nameEndAdornment = useMemo(() => {
      if (formik.errors.name && formik.touched.name) {
        return <ErrorOutlineIcon sx={{ color: errorColor }} />;
      }
      if (!formik.errors.name && formik.touched.name) {
        return <CheckCircleOutlineIcon sx={{ color: successColor }} />;
      }
    }, [errorColor, successColor, formik.errors.name, formik.touched.name]);

    const phoneEndAdornment = useMemo(() => {
      if (formik.errors.phone && formik.touched.phone) {
        return <ErrorOutlineIcon sx={{ color: errorColor }} />;
      }
      if (!formik.errors.phone && formik.touched.phone) {
        return <CheckCircleOutlineIcon sx={{ color: successColor }} />;
      }
    }, [errorColor, successColor, formik.errors.phone, formik.touched.phone]);

    const messageEndAdornment = useMemo(() => {
      if (formik.errors.message && formik.touched.message) {
        return <ErrorOutlineIcon sx={{ color: errorColor }} />;
      }
      if (!formik.errors.message && formik.touched.message) {
        return <CheckCircleOutlineIcon sx={{ color: successColor }} />;
      }
    }, [errorColor, successColor, formik.errors.message, formik.touched.message]);

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
          />
          <FormHelperText error sx={fieldHelperTextStyle}>
            {messageErrorHelperText}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" onClick={handleClose}>
            Submit
          </Button>
        </DialogActions>
      </form>
    );
  },
);
