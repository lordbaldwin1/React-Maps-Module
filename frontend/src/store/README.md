# Redux Store

This directory contains Redux-related files for state management.

## Structure

- `slices/`: Redux slices (reducers + actions)
- `hooks.ts`: Custom Redux hooks
- `index.ts`: Store configuration
- `rootReducer.ts`: Root reducer combining all slices

## Key Concepts

- We use Redux Toolkit for efficient Redux development
- Slices combine reducers and actions for a specific feature
- Custom hooks (`useAppDispatch` and `useAppSelector`) provide typed access to the store

## Best Practices

- Keep slices focused on a specific domain or feature
- Use `createSlice` from Redux Toolkit to minimize boilerplate
- Use selectors for deriving data from the state
