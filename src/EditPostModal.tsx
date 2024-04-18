import React from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";

interface EditPostModalProps {
  open: boolean;
  text: string;
  onClose: () => void;
  onSave: (text: string) => void;
  onTextChange: (text: string) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  text,
  onClose,
  onSave,
  onTextChange,
}) => {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="edit-dialog-title">
      <DialogTitle id="edit-dialog-title">Edit Post</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="post"
          label="Edit Post"
          type="text"
          fullWidth
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onSave(text)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
