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
  useEditPostMutation,
} from "./hooks/useToDoList";
import EditPostModal from "./EditPostModal"; // Import the modal component

function App() {
  const {toggleTheme} = useThemeContext();
  const [newPostText, setNewPostText] = useState<string>("");
  const [editPostText, setEditPostText] = useState<string>("");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState<number | null>(null);

  const postQuery = usePostQuery();
  const newPostMutation = useNewPostMutation();
  const editMutation = useEditPostMutation();
  const deletePostMutation = useDeletePostMutation();

  const openEditModal = (postText: string, postId: number) => {
    setEditPostText(postText);
    setCurrentEditingId(postId);
    setEditModalOpen(true);
  };

  const handleEditSave = (text: string) => {
    console.log(`Saving post id ${currentEditingId} with new text: ${text}`);
    // Assume you have a mutation hook to update the post
    // updatePostMutation.mutate({ id: currentEditingId, text });
    setEditModalOpen(false);
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
          color="secondary"
          onClick={() => newPostMutation.mutate(newPostText)}
        >
          <AddIcon />
        </IconButton>
      </Stack>

      <Box alignContent="flex-start">
        {postQuery?.data?.map((post, index) => (
          // <Stack key={post.id} direction="row" alignItems="center">
          <Stack
            key={post.id}
            direction="row"
            spacing={1}
            alignContent="center"
            alignItems="center"
          >
            <IconButton
              color="secondary"
              onClick={() => openEditModal(post.title, post.id)}
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
          // </Stack>
        ))}
      </Box>
      <EditPostModal
        open={editModalOpen}
        text={editPostText}
        onClose={() => setEditModalOpen(false)}
        onSave={handleEditSave}
        onTextChange={setEditPostText}
      />
    </Box>
  );
}

export default App;
