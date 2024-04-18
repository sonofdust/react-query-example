import React, {useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  TextField,
  Button,
  //  textFieldClasses,
} from "@mui/material";
import {useEditPostMutation} from "./hooks/useToDoList";

interface EditPostModalProps {
  open: boolean;
  id: string;
  title: string;
  onClose: () => void;
  //  onSave: (text: string) => void;
  // onTextChange: (text: string) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  id,
  title,
  onClose,
}) => {
  const editMutation = useEditPostMutation();
  const [newText, setNewText] = useState<string>(title);

  //   useEffect(() => {
  //     if (postQuery.data) {
  //       const item = postQuery.data.find((item) => item.id === id);
  //       if (item) {
  //         setNewText(item.title);
  //       }
  //     }
  //   }, []);
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
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            editMutation.mutate({id, title: newText});
            onClose();
          }}
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPostModal;
