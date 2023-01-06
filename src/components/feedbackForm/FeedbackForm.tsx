import { memo, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import ReactPhoneInput from 'react-phone-input-material-ui';

import { FeedbackFormInitialValues } from 'components/feedbackForm/types';

export const FeedbackForm = memo(() => {
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
  });
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Форма обратной связи</DialogTitle>
        <form onSubmit={formik.handleSubmit}>
          <DialogContent>
            <DialogContentText>Пожалуйста, заполните форму</DialogContentText>
            <TextField
              {...formik.getFieldProps('name')}
              autoFocus
              margin="normal"
              id="name"
              label="Имя"
              fullWidth
            />
            <ReactPhoneInput
              inputProps={{
                type: 'phone',
                fullWidth: true,
                label: 'Телефон',
                name: 'phone',
                id: 'phone',
                margin: 'normal',
                autoFocus: true,
              }}
              value={formik.values.phone}
              onChange={e => formik.setFieldValue('phone', e)}
              onBlur={() => formik.setTouched({ ...formik.touched, phone: true })}
              component={TextField}
            />
            <TextField
              {...formik.getFieldProps('message')}
              autoFocus
              margin="normal"
              id="message"
              label="Сообщение"
              fullWidth
              multiline
              rows={4}
            />
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
