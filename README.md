# The Official Team Sparkle Motion Repository 🎉

## Getting started

1. Go through all the [preliminaries](#preliminaries).

2. Clone this repository

   ```bash
   git clone git@github.com:TeamSparkleMotion/TeamSparkleMotion-Web.git
   ```

3. Run the appropriate setup script.

   - Windows: [`.\scripts\setup.bat`](/scripts/setup.bat)
   - Linux: [`./scripts/setup.sh`](/scripts/setup.sh)

4. Change [.env](/frontend/.env) in your clone to reflect the device you are running the project on.

5. Acquire API credentials and update them in [.env](/frontend/.env):
   - [`VITE_GOOGLE_MAPS_API_KEY`](https://developers.google.com/maps/documentation/embed/get-api-key)
   - [`VITE_HERE_API_KEY`](https://www.here.com/docs/bundle/getting-here-credentials/page/README.html)

   *Note: The credentials that are currently hardcoded in the .env file will remain active until **08-20-2024***


5. If port 8081 isn't available on your machine:

   - Change `server.port` in [application.properties](/backend/src/main/resources/application.properties) to an available port.
   - Change `API_BASE_URL` in [apiConfig.js](/frontend/apiConfig.js) to use the same port.


## Running the app

1. Launch the backend:

   - Windows: [`.\scripts\run-backend.bat`](/scripts/run-backend.bat)
   - Linux: [`./scripts/run-backend.sh`](/scripts/run-backend.sh)

2. Launch the frontend:

   - Windows: [`.\scripts\run-frontend.bat`](/scripts/run-frontend.bat)
   - Linux: [`./scripts/run-frontend.sh`](/scripts/run-frontend.sh)

## Preliminaries

1. An ssh key is required\* to clone this repository. [Setup](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) or use an ssh key on your machine that's connected to your GitHub account with access to this repository.

2. Ensure you have nvm installed (the Node version manager).

   - [Windows](https://github.com/coreybutler/nvm-windows/)
   - [Linux](https://github.com/nvm-sh/nvm/)

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
