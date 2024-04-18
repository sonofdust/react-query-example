import React, {useState} from "react";
import {
  Box,
  TextField,
  Typography,
  CircularProgress,
  IconButton,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {useThemeContext} from "./context/ThemeContext";
import {
  useDeletePostMutation,
  usePostQuery,
  useNewPostMutation,
  //  useEditPostMutation,
} from "./hooks/useToDoList";
import EditPostModal from "./EditPostModal"; // Import the modal component

function App() {
  const {toggleTheme} = useThemeContext();
  const [newPostText, setNewPostText] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [id, setEditId] = useState<string>("");
  const [title, setEditTitle] = useState<string>("");

  const postQuery = usePostQuery();
  const newPostMutation = useNewPostMutation();

  const deletePostMutation = useDeletePostMutation();

  const openEditModal = (id: string, title: string) => {
    setEditId(id);
    setEditTitle(title);
    setEditModalOpen(true);
  };

  if (postQuery.isLoading) return <CircularProgress />;
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
              onClick={() => openEditModal(post.id, post.title)}
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
      <EditPostModal
        open={editModalOpen}
        id={id}
        title={title}
        onClose={() => setEditModalOpen(false)}
        // onSave={handleEditSave}
        // onTextChange={setEditPostText}
      />
    </Box>
  );
}

export default App;
