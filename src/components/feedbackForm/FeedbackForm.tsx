import { memo, useMemo, useState } from 'react';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { FormHelperText, useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import ReactPhoneInput from 'react-phone-input-material-ui';

import { CustomTextField } from 'components/customTextFIeld/CustomTextField';
import { fieldHelperTextStyle } from 'components/feedbackForm/styles';
import { FeedbackFormInitialValues } from 'components/feedbackForm/types';
import { getErrorHelperText } from 'utils/formikHelpers';
import { FeedbackFormSchema } from 'utils/validation';

export const FeedbackForm = memo(() => {
  const { palette } = useTheme();
  const successColor = palette.success.main;
  const errorColor = palette.error.main;

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      message: '',
    } as FeedbackFormInitialValues,
    onSubmit: (values: FeedbackFormInitialValues) => {
      const dataToSend: FeedbackFormInitialValues = {
        ...values,
        phone: `+${values.phone}`,
      };

      const space = 2;

      alert(JSON.stringify(dataToSend, null, space));
    },
    validationSchema: FeedbackFormSchema,
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Форма обратной связи</DialogTitle>
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
      </Dialog>
    </div>
  );
});
