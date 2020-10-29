import React from "react";
import { useRouteData } from "@remix-run/react";

interface PageData {
  todos: Todo[];
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export function meta() {
  return {
    title: "Remix Todo App",
    description: "Simple Todo App built with Remix!",
  };
}

export default function Index() {
  let data = useRouteData<PageData>();

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Todo App built with Remix!</h2>
      <ul>
        {data.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}
