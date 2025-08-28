# Frontend Coding Challenge React

A React application built with Vite, TypeScript, and Tailwind CSS. This project implements a task management system with remote data fetching capabilities, following atomic design principles.

## Project Structure

```
frontend-coding-challenge-react/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Button/
│   │   │   ├── Input/
│   │   │   ├── Loading/
│   │   │   ├── Modal/
│   │   │   └── Text/
│   │   ├── molecules/
│   │   │   ├── ListItem/
│   │   │   ├── TaskForm/
│   │   │   └── TaskItem/
│   │   ├── organisms/
│   │   │   ├── RemoteList/
│   │   │   └── TaskList/
│   │   ├── pages/
│   │   │   ├── HomePage/
│   │   │   ├── ListPage/
│   │   │   └── TasksPage/
│   │   └── templates/
│   │       └── MainTemplate/
│   ├── hooks/
│   │   ├── useAppDispatch.ts
│   │   ├── useAppSelector.ts
│   │   ├── useList.ts
│   │   └── useTasks.ts
│   ├── lib/
│   │   └── axios.ts
│   ├── services/
│   │   └── listService.ts
│   ├── store/
│   │   ├── index.ts
│   │   └── tasksSlice.ts
│   ├── types/
│   │   ├── remote.ts
│   │   └── task.ts
│   ├── utils/
│   │   ├── date.ts
│   │   ├── persistMiddleware.ts
│   │   └── url.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env
├── biome.json
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.setup.ts
└── README.md
```

## Features

- **Atomic Design**: Components organized in atoms, molecules, organisms, pages, and templates
- **State Management**: Redux Toolkit with persistence middleware
- **Routing**: React Router DOM for navigation
- **Styling**: Tailwind CSS for utility-first styling
- **Testing**: Vitest with React Testing Library
- **Code Quality**: Biome for linting and formatting
- **Type Safety**: Full TypeScript implementation

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```sh
   pnpm install
   ```

3. Create environment file (see Environment Variables section)
4. Start the development server:

   ```sh
   pnpm dev
   ```

## Environment Variables

You must create a `.env` file in the root of the project. Example:

```env
VITE_API_BASE_URL=https://api.jsonbin.io/v3/b/65c62f1e1f5677401f3e735e
```

> **⚠️ Review Note:** The API URL value is included here for review purposes only. It is **NOT recommended** to include real .env values in documentation or the repository. In production, this should be kept private and secure.

> **Note:** Only variables prefixed with `VITE_` are exposed to the client. Do not store sensitive information here.

## Available Scripts

- `pnpm dev` — Start the development server
- `pnpm build` — Build for production
- `pnpm preview` — Preview the production build locally
- `pnpm lint` — Run Biome linter
- `pnpm format` — Format code with Biome
- `pnpm test` — Run tests with Vitest
- `pnpm test:watch` — Run tests in watch mode
- `pnpm test:ui` — Run tests with UI interface

## Testing

The project includes comprehensive testing setup with Vitest and React Testing Library:

### Test Structure
- **Atoms**: Basic component functionality, props, and styling
- **Molecules**: Component composition and interactions
- **Organisms**: Complex component behavior and state management

### Running Tests
```sh
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run specific test file
pnpm test -t "Button"

# Run tests with UI
pnpm test:ui
```

### Test Coverage
- Component rendering and props
- User interactions (clicks, typing, form submissions)
- State changes and side effects
- Error handling and edge cases
- Mock implementations for external dependencies

## Code Quality

### Biome Configuration
The project uses Biome for linting and formatting, configured in [`biome.json`](biome.json).

### TypeScript Configuration
- Strict type checking enabled
- Path aliases configured (`@` points to `src/`)
- Separate configs for app and node environments

## Main Files

- [`src/App.tsx`](src/App.tsx): Main application component with routing
- [`src/main.tsx`](src/main.tsx): React entry point
- [`src/store/index.ts`](src/store/index.ts): Redux store configuration
- [`src/hooks/useTasks.ts`](src/hooks/useTasks.ts): Task management hook
- [`src/hooks/useList.ts`](src/hooks/useList.ts): Remote data fetching hook

## Architecture

### Component Hierarchy
1. **Atoms**: Basic UI components (Button, Input, Text, etc.)
2. **Molecules**: Composite components (TaskForm, TaskItem, ListItem)
3. **Organisms**: Complex components (TaskList, RemoteList)
4. **Pages**: Route-level components
5. **Templates**: Layout components

### State Management
- Redux Toolkit for global state
- Custom hooks for data fetching and business logic
- Local state for component-specific data

### Data Flow
- Remote data fetched via axios with error handling
- Local storage persistence for tasks
- Optimistic updates for better UX

## Notes

- [`vite.config.ts`](vite.config.ts) contains Vite configuration with React plugin and testing setup
- [`tsconfig.json`](tsconfig.json) defines TypeScript compilation options
- [`biome.json`](biome.json) contains linting and formatting rules
- [`vitest.setup.ts`](vitest.setup.ts) configures testing environment