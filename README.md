# Team Sparkle Motion EV Mapping Module
Members: Danny Love, Teresa Booth, Bruce Cosgrove, Meghan Leicht, Zachary Springer

## Backend

The backend of this project is a placeholder implementation designed to simulate the technology stack used by the main development team. It serves as a stand-in backend, enabling the development and testing of the frontend alongside the Ranger EV project without requiring access to their proprietary codebase.

### Overview

The backend is built using Spring Boot, and is structured to handle basic CRUD operations related to charge sites. This setup allowed the capstone team to develop the frontend without access to the Ranger EV codebase.

While this backend provides the necessary functionality to support frontend development, it is intended to be replaced or integrated with the final backend developed by the main team. The backend uses similar technologies and patterns to ensure compatibility and ease of transition once the final backend becomes available.

### Key Components

- **Application Entry Point**: The backend application is initiated via the `BackendApplication` class, which sets up the Spring context and starts the application server.

- **Database Configuration**: The `DatabaseCheck` class handles database connectivity, ensuring that the application can connect to the configured database upon startup.

- **Data Models and Repositories**: The data model for charge sites is defined in the `ChargeSite` class, while the `ChargeSiteRepository` interface provides methods for database interactions, including custom queries.

- **Service Layer**: The `ChargeSiteService` class encapsulates the business logic for managing charge sites, including fetching, saving, updating, and deleting records.

- **Controller Layer**: The `ChargeSiteController` class exposes RESTful API endpoints for interacting with charge sites. This includes operations such as retrieving filtered charge site data, creating new charge sites, updating existing ones, and deleting charge sites. All write operations are included for completeness, and not implemented by the frontend.

## Frontend

This section of the documentation provides detailed guidance on setting up, running, and extending the frontend of the application. Whether you are contributing to the codebase or simply trying to understand how the frontend works, this guide will help you navigate through the key aspects of the project.

### NPM Commands

`frontend/package.json` contains a collection of scripts for running, testing and evaluating the frontend.

1. `npm run dev`
   - Starts the Vite development server, which provides fast and hot module replacement (HMR) for rapid development.

2. `npm run build`
   - Compiles TypeScript files using the TypeScript compiler (`tsc`) in build mode, and then bundles the application using Vite's build process.

3. `npm run lint`
   - Runs ESLint on all TypeScript (`.ts`) and TypeScript JSX (`.tsx`) files in the project. It ensures that there are no linting errors and reports any unused ESLint directive comments, while enforcing a zero-tolerance policy on warnings.

4. `npm run preview`
   - Launches a local server to preview the production build of your application. This is useful for checking how the built application will look and function before deploying it.

5. `npm run test`
   - Runs the Vitest testing framework, which is used for running unit tests and end-to-end tests in your project.

6. `npm run test:run`
   - Executes all tests in the project in a non-interactive mode, which exits upon completion.

7. `npm run build-docs`
   - Generates documentation for your TypeScript code using TypeDoc. This script creates a comprehensive documentation site based on the comments and annotations within the code. After running the command, the results can be found at `frontend/docs/index.html`.

### Project File Structure

Our project follows a structured organization to maintain clarity and scalability. Here's an overview of the main directories and their purposes:

```
frontend/
├── public/                 # Static assets served as-is
├── src/                    # Source code
│   ├── assets/             # Project assets (fonts, images)
│   │   ├── fonts/
│   │   └── react.svg
│   ├── components/         # Reusable React components
│   │   ├── common/         # Shared, generic components
│   │   ├── layout/         # Layout-related components
│   │   └── map/            # Map-specific components
│   ├── pages/              # Top-level page components
│   ├── services/           # API and service-related code
│   ├── store/              # Redux store setup and slices
│   │   ├── slices/         # Redux slices
│   │   ├── hooks.ts        # Custom Redux hooks
│   │   ├── index.ts        # Store configuration
│   │   └── rootReducer.ts  # Root reducer
│   ├── styles/             # CSS and style-related files
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Application entry point
├── tests/                  # Test files
├── .env                    # Environment variables
└── vite.config.ts          # Vite configuration
```

#### Key Directories

- `public/`: Contains static assets that are served directly without processing.
- `src/`: The main source code directory.
  - `assets/`: Contains project assets like fonts and images.
  - `components/`: Houses reusable React components, organized by type.
  - `pages/`: Top-level components that correspond to different routes/pages.
  - `services/`: API calls and other service-related code.
  - `store/`: Redux store configuration, slices, and custom hooks.
  - `styles/`: CSS files and other style-related resources.
  - `utils/`: Utility functions and helper modules.
- `tests/`: Contains all test files, mirroring the structure of `src/`.

### State Management with Redux

Our application uses Redux for state management, specifically leveraging Redux Toolkit for efficient Redux development.

#### Store Structure

The Redux store is set up in `src/store/index.ts`. It uses the root reducer defined in `src/store/rootReducer.ts`, which combines all individual slice reducers.

#### Slices

Redux slices are located in `src/store/slices/`. Each slice corresponds to a specific feature or domain of the application state. For example, `counterSlice.ts` manages the state for a counter feature.

#### Custom Hooks

We use custom hooks defined in `src/store/hooks.ts` to interact with the Redux store:

- `useAppDispatch`: A typed version of `useDispatch` hook.
- `useAppSelector`: A typed version of `useSelector` hook.

These hooks provide type safety when dispatching actions or selecting state from the store.

#### Usage in Components

To use Redux in a component:

1. Import the custom hooks:
   ```typescript
   import { useAppSelector, useAppDispatch } from '../store/hooks';
   ```

2. Use `useAppSelector` to access state:
   ```typescript
   const count = useAppSelector((state) => state.counter.value);
   ```

3. Use `useAppDispatch` to dispatch actions:
   ```typescript
   const dispatch = useAppDispatch();
   dispatch(increment());
   ```

#### Adding New State

To add new state to the application:

1. Create a new slice in `src/store/slices/`.
2. Define the initial state, reducers, and actions in the slice.
3. Export the reducer and actions.
4. Add the new reducer to `rootReducer.ts`.

## Architecture
![Architecture](https://github.com/user-attachments/assets/fa853295-27d0-4c66-ba5e-b9502f82c4d7)

## Overview
![Overview](https://github.com/user-attachments/assets/12f763f6-7c27-4be7-88ce-ae7b9d26e9f4)

## Callouts
![RangerEVPopup](https://github.com/user-attachments/assets/40623957-2554-42bd-b4c6-4a0b37a154d0)

## Navigation (Opens option in new tab)
![RangerEVNavigation](https://github.com/user-attachments/assets/e43df220-406c-4d45-bf2e-eafa8a1aca38)

## Pins
![Pins](https://github.com/user-attachments/assets/3c96d52b-c874-43d0-b59a-31616c878362)

## Grouped Pins
![Grouped pins 1](https://github.com/user-attachments/assets/430e8cb4-b59d-48a7-bb65-e4dbbc0b8aa9)
![Grouped pins 2](https://github.com/user-attachments/assets/923199e2-5575-4b25-ba90-4be39e2b85a2)

## Searchbar
![Spacebar](https://github.com/user-attachments/assets/290203ba-e244-4c83-8a7f-5d9fa94f8593)

## Filters
![694c08c8d17a0dcf2d0d5722f22cfea6](https://github.com/user-attachments/assets/d9ba5854-c9cd-4223-a876-3a59c24b5a51)








