import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    poolOptions: {
      threads: {
        singleThread: true, // Hanya satu thread
      },
      forks: {
        singleFork: true, // Hanya satu forked process
      },
    },
  },
});
