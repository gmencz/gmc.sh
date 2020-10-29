import type { DataLoader } from "@remix-run/core";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const todos: Todo[] = [
  { id: 1, title: "Learn Remix", completed: false },
  { id: 2, title: "Build amazing app", completed: false },
  { id: 3, title: "Tweet about Remix", completed: false },
];

let loader: DataLoader = async () => {
  return {
    todos,
  };
};

export = loader;
