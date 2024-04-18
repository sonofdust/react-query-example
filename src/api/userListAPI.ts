//import {useState} from "react";
import {v4 as uuidv4} from "uuid";

const MIL_SEC = 50;
//const [list, setList] =(state:{{}})=> useState<{id:string;title:string}>([])
let POSTS: {id: string; title: string}[] = [
  {id: uuidv4(), title: "Post 1"},
  {id: uuidv4(), title: "Post 2"},
];
const wait = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

export const addPost = (title: string) =>
  wait(MIL_SEC).then(() => POSTS.push({id: uuidv4(), title}));

export const editPost = (task: {id: string; title: string}) =>
  wait(MIL_SEC).then(() => {
    POSTS = [task, ...POSTS.filter((e) => e.id !== task.id)];
  });

export const deletePost = (id: string) =>
  wait(MIL_SEC).then(() => {
    POSTS = POSTS.filter((e) => e.id !== id);
  });

export const getPosts = () => wait(MIL_SEC).then(() => [...POSTS]);
