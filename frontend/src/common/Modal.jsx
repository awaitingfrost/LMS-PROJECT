import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ transaction, handleSubmit }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen}>Return Book</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to return this book?
          </Typography>
          <Box sx={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between' }}>
            <Button size="medium" variant="contained" color="success" onClick={() => { handleSubmit(); handleClose() }}>Yes</Button>
            <Button size="medium" variant="contained" color="error" onClick={handleClose}>Cancel</Button>
          </Box>
        </Box>
      </Modal>
    </div >
  );
}
