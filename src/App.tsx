import {useState} from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Stack,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useThemeContext} from "./context/ThemeContext";
import {
  useDeletePostMutation,
  usePostQuery,
  useNewPostMutation,
  useEditPostMutation,
} from "./hooks/useToDoList";

function App() {
  const {toggleTheme} = useThemeContext();
  const [newPostText, setNewPostText] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [id, setEditId] = useState<string>("");
  const [title, setEditTitle] = useState<string>("");

  const postQuery = usePostQuery();
  const newPostMutation = useNewPostMutation();
  const editMutation = useEditPostMutation();
  const deletePostMutation = useDeletePostMutation();
  const openEditModal = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
    setIsOpen(true);
  };

  //  if (postQuery.isLoading) return <CircularProgress />;
  if (postQuery.isError)
    return (
      <Typography color="error">
        Error: {JSON.stringify(postQuery.error)}
      </Typography>
    );

  return (
    <Box
      marginTop="2rem"
      display="flex"
      flexDirection="column"
      alignItems="center"
      minHeight="100vh"
    >
      <Button onClick={toggleTheme}>Toggle Theme</Button>
      <Stack
        direction="row"
        spacing={1}
        alignContent="center"
        alignItems="center"
      >
        <TextField
          label="Enter new post"
          variant="outlined"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && newPostText !== "") {
              newPostMutation.mutate(newPostText);
              setNewPostText("");
            }
          }}
          style={{marginBottom: "20px"}}
        />
        <IconButton
          disabled={newPostText == ""}
          color="secondary"
          onClick={() => {
            newPostMutation.mutate(newPostText);
            setNewPostText("");
          }}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Box alignContent="flex-start">
        {postQuery?.data?.map((post, index) => (
          <Stack
            key={post.id}
            direction="row"
            spacing={1}
            alignContent="center"
            alignItems="center"
          >
            <IconButton
              color="secondary"
              onClick={(e) => {
                e.preventDefault();
                openEditModal(post.id, post.title);
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              color="error"
              disabled={deletePostMutation.isLoading}
              onClick={() => deletePostMutation.mutate(post.id)}
            >
              <DeleteIcon />
            </IconButton>
            <Typography>{`${index + 1}. ${post.title}`}</Typography>
          </Stack>
        ))}
      </Box>
      <Dialog
        open={
          newPostMutation.isLoading ||
          editMutation.isLoading ||
          postQuery.isLoading ||
          deletePostMutation.isLoading
        }
      >
        <DialogContent>
          <Box sx={{display: "flex"}} alignContent="center" alignItems="center">
            <CircularProgress />
          </Box>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        aria-labelledby="edit-dialog-title"
      >
        <DialogTitle id="edit-dialog-title">Edit Post</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="post"
            label="Edit Post"
            type="text"
            fullWidth
            value={title}
            onChange={(e) => setEditTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && title.trim() !== "") {
                e.preventDefault();
                editMutation.mutate({id, title});
                setIsOpen(false);
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (title.trim() !== "") {
                editMutation.mutate({id, title});
                setIsOpen(false);
              }
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      {/* <EditPostModal
        open={editModalOpen}
        id={id}
        title={title}
        onClose={() => setEditModalOpen(false)}
      /> */}
    </Box>
  );
}

export default App;
