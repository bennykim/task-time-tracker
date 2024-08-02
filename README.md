# Task Time Tracker

This project is a Pomodoro timer implemented using Vite, TypeScript, React, IndexedDB (idb), and Bulma for styling. The application helps users manage their tasks and time efficiently using the Pomodoro technique.

## Features

- **Pomodoro Timer**: A customizable timer for managing work sessions and breaks.
- **Task Management**: Add, edit, and remove tasks.
- **Persistent Storage**: Uses IndexedDB to store tasks and timer settings.
- **Theming**: Light and dark mode support.
- **Responsive Design**: Styled with Bulma to ensure responsiveness across devices.
- **Celebration Effect**: Displays a firecracker animation upon task completion.

## Installation

To set up and run the project locally, follow these steps:

1. **Clone the repository**:

   ```bash
   git clone [repository-url]
   cd task-time-tracker
   ```

2. **Install dependencies using pnpm**:

   ```bash
   pnpm install
   ```

3. **Start the development server**:

   ```bash
   pnpm start
   ```

4. **Run tests**:
   ```bash
   pnpm test
   ```

## Usage

Upon starting the development server, the application will be available at `http://localhost:3000`. The main screen allows users to manage their tasks and control the Pomodoro timer. Users can start, pause, and reset the timer. When a task is completed, a firecracker animation will be displayed as a celebration effect.

## Technologies Used

- **Vite**: For fast and efficient build tooling.
- **TypeScript**: Ensuring type safety and robust code.
- **React**: Building user interfaces.
- **IndexedDB (idb)**: Storing tasks and settings persistently in the browser.
- **Bulma**: Providing a responsive and modern design.
- **PNPM**: Fast, disk space-efficient package manager.

## Project Structure

```
src/
├── App.tsx
├── main.tsx
├── index.css
├── vite-env.d.ts
├── types/
├── test/
├── constants/
├── provider/
├── utils/
├── components/
│   ├── Tabs/
│   ├── SideBar/
│   ├── Form/
│   ├── Tasks/
│   ├── Box/
│   ├── Timer/
│   ├── CheckBox/
│   ├── Button/
│   ├── Table/
│   ├── Firecracker/
│   └── Icon/
├── hooks/
├── db/
│   ├── config.ts
│   └── api/
├── api/
├── data/
└── views/
```

## Roadmap

Here are some features we're planning to implement in the future:

- [ ] Sound notifications
- [ ] Task categories and tags
- [ ] Data export/import functionality
- [ ] UI/UX improvements
- [ ] Create a completed task statistics dashboard
