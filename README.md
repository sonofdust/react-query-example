# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# Purpose of this DEMO.

The purpose of thie demo is to demonstrate how to leverage ReactQuery to manage state.

**Please read the folling docs carefully before going over this demo:** https://tanstack.com/query/latest/docs/framework/react/guides/prefetching

**Also here is a good video tutorial that I used to get started:** https://www.youtube.com/watch?v=r8Dg0KVnfMA

In a well-structured React application using TypeScript and React Query, organizing CRUD operations effectively is crucial for maintainability, scalability, and separation of concerns. Below, I'll detail how to best organize your CRUD operations, using the tasks example as a reference.

### Best Practices for Organizing CRUD Operations

1. **Separate API Logic from UI Components**
   - **Why?** Keeps UI components cleaner and focuses them on rendering and handling user interactions, not on how data is fetched or manipulated.
   - **How?** Extract API calls into separate functions or a dedicated service module.
2. **Use Custom Hooks for Data Handling**
   - **Why?** Encapsulates data fetching and mutation logic, making these operations reusable across components and reducing duplication.
   - **How?** Define hooks for each type of operation (fetch, create, update, delete) that internally use React Query hooks.
3. **Centralize API Interaction**
   - **Why?** Centralizing API interactions in one or a few modules makes it easier to manage changes to API endpoints or structures and apply common error handling and data formatting.
   - **How?** Create a service file or a directory for all API-related functions.

### Example Refinement: Organizing CRUD Operations

Let’s break down the CRUD operations for a tasks management application:

#### Directory Structure

├── api/ # API interactions
│ └── tasksApi.ts # Task-specific API functions
│
├── hooks/ # Custom hooks
│ └── useTasks.ts # Hooks for tasks data fetching and manipulation
│
├── components/ # React components
│ └── TasksComponent.tsx
│
└── types/ # TypeScript types
└── taskTypes.ts1. API Functions (src/api/tasksApi.ts)

Here you define all the API call functions. This is where the CRUD operations are directly handled.

### Key consepts of React Query that are used in this DEMO

1. Have all api's in a separage folder
2. Leverage TanStac Query and understand the following concepts see the Hooks folder of this demo.
   1. Queries: https://tanstack.com/query/latest/docs/framework/react/guides/prefetching
   2. Mutations: https://tanstack.com/query/latest/docs/framework/react/guides/mutations
   3. Query Invalidatioh: https://tanstack.com/query/latest/docs/framework/react/guides/query-invalidation
3. After familerizing your self with the TasStac study the hooks folder.
4. Understand the the state can be accessed from the queryClient.
