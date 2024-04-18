// src/ExampleComponent.tsx
import React from "react";
import {useQuery} from "react-query";

async function fetchExampleData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export default function ExampleComponent() {
  const {data, error, isLoading} = useQuery("exampleData", fetchExampleData);

  if (isLoading) return <div>Loading...</div>;
  if (error)
    return <div>An error has occurred: {(error as Error).message}</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.body}</p>
    </div>
  );
}
