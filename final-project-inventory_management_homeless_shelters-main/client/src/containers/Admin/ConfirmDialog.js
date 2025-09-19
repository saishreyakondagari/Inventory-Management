import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ConfirmDialog = (props) => {
  const { title, description, open, setOpen, onConfirm } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>
        <p>{description}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleConfirm} color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
