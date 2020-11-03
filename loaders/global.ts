import type { DataLoader } from "@remix-run/core";

let loader: DataLoader = async () => {
  return {};
};

export = loader;
