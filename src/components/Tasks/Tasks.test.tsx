import { fireEvent, render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { TaskTimerContext } from "@/provider";
import { Tasks } from "./Tasks";

const mockUpdateTasks = vi.fn();
const mockOnClear = vi.fn();

const createMockTask = (id: number, text: string, completed = false): Task => ({
  id,
  text,
  completed,
  createdAt: "2023-01-01",
  totalDuration: 0,
});

const renderTasks = (initialTasks: Task[] = []) => {
  const mockContextValue = {
    database: null,
    tasks: initialTasks,
    coords: null,
    updateTasks: mockUpdateTasks,
  };

  return render(
    <TaskTimerContext.Provider value={mockContextValue}>
      <Tasks onClear={mockOnClear} />
    </TaskTimerContext.Provider>
  );
};

describe("Tasks Component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test("renders empty state correctly", () => {
    renderTasks();

    expect(screen.getByPlaceholderText("Add a new task")).toBeInTheDocument();
    expect(screen.getByText("Add Task")).toBeInTheDocument();
    expect(screen.getByText("No tasks added yet.")).toBeInTheDocument();
  });

  test("adds a new task", () => {
    renderTasks();

    const input = screen.getByPlaceholderText("Add a new task");
    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockUpdateTasks).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ text: "New Task" })])
    );
  });

  test("toggles task completion", () => {
    renderTasks([createMockTask(1, "Test Task")]);

    fireEvent.click(screen.getByRole("checkbox"));

    expect(mockUpdateTasks).toHaveBeenCalledWith([
      expect.objectContaining({ completed: true }),
    ]);
  });

  test("deletes a task", () => {
    renderTasks([createMockTask(1, "Test Task")]);

    fireEvent.click(screen.getByLabelText("Delete task"));

    expect(mockUpdateTasks).toHaveBeenCalledWith([]);
  });

  test("edits task title", () => {
    renderTasks([createMockTask(1, "Test Task")]);

    fireEvent.click(screen.getByText("Test Task"));
    const input = screen.getByDisplayValue("Test Task");
    fireEvent.change(input, { target: { value: "Updated Task" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(mockUpdateTasks).toHaveBeenCalledWith([
      expect.objectContaining({ text: "Updated Task" }),
    ]);
  });

  test("clears completed tasks", () => {
    renderTasks([
      createMockTask(1, "Task 1", true),
      createMockTask(2, "Task 2"),
    ]);

    fireEvent.click(screen.getByText("Save and Remove Completed"));

    expect(mockUpdateTasks).toHaveBeenCalledWith([
      expect.objectContaining({ text: "Task 2" }),
    ]);
    expect(mockOnClear).toHaveBeenCalledWith([
      expect.objectContaining({ text: "Task 1" }),
    ]);
  });
});
