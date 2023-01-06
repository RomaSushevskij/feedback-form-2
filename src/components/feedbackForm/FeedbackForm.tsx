import { memo, useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

export const FeedbackForm = memo(() => {
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Форма обратной связи</DialogTitle>
        <form>
          <DialogContent>
            <DialogContentText>Пожалуйста, заполните форму</DialogContentText>
            <TextField autoFocus margin="normal" id="name" label="Имя" fullWidth />
            <TextField
              autoFocus
              margin="normal"
              id="phone"
              label="Телефон"
              type="phone"
              fullWidth
            />
            <TextField
              autoFocus
              margin="normal"
              id="email"
              label="Сообщение"
              fullWidth
              multiline
              rows={4}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
});
