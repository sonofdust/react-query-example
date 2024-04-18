// src/useTodos.ts
import {useMutation, useQuery, useQueryClient} from "react-query";
import {getPosts, deletePost, addPost, editPost} from "../api/userListAPI";

// Custom hook to fetch posts
export const usePostQuery = () =>
  useQuery({
    queryKey: ["posts"],
    queryFn: () => getPosts(),
  });

// Custom hook to get the QueryClient instance
//export const customQueryClient = () => useQueryClient();

// Custom hook to handle the mutation for adding a new post
export const useNewPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (title: string) => addPost(title),
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
};

export const useEditPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post: {id: string; title: string}) => editPost(post),
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
};

// Custom hook to handle the mutation for deleting a post
export const useDeletePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deletePost(id),
    onSuccess: () => queryClient.invalidateQueries("posts"),
  });
};
