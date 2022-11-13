import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";

export default function ActionsBar({
  createUpdateForm,
  open,
  handleOpen,
  handleClose,
}) {
  return (
    <Box sx={{ display: "flex",padding:'.5em' }}>
      <BasicModal
        open={open}
        handleOpen={() => handleOpen(true)}
        handleClose={handleClose}
        createUpdateForm={createUpdateForm}
      />
    </Box>
  );
}

function BasicModal({ handleClose, handleOpen, open, createUpdateForm }) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Button onClick={handleOpen} variant="contained" color="primary">
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>{createUpdateForm}</Box>
      </Modal>
    </div>
  );
}
