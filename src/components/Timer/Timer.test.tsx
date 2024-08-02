import { TaskTimerContext } from "@/provider";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import { TASK_TIMER, TASK_TYPE_WORK, THEME_PINK } from "@/constants";
import { Timer } from "./Timer";

vi.mock("@/components", () => ({
  Off: () => <div data-testid="icon-off">Off Icon</div>,
  On: () => <div data-testid="icon-on">On Icon</div>,
  Break: () => <div data-testid="icon-break">Break Icon</div>,
  Pause: () => <div data-testid="icon-pause">Pause Icon</div>,
  Play: () => <div data-testid="icon-play">Play Icon</div>,
  Reset: () => <div data-testid="icon-reset">Reset Icon</div>,
}));

const mockContextValue = {
  database: null,
  tasks: [],
  coords: null,
  updateTasks: vi.fn(),
};

const MockTaskTimerProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <TaskTimerContext.Provider value={mockContextValue}>
    {children}
  </TaskTimerContext.Provider>
);

describe("Timer Component", () => {
  const timerProps = {
    type: TASK_TYPE_WORK,
    title: TASK_TIMER,
    duration: 25,
    theme: THEME_PINK,
    step: 5,
  };

  const renderTimer = () => {
    render(
      <MockTaskTimerProvider>
        <Timer {...timerProps} />
      </MockTaskTimerProvider>
    );
  };

  test("renders the Timer component", () => {
    renderTimer();

    expect(screen.getByTestId("icon-off")).toBeInTheDocument();
    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  test("starts and pauses the timer", () => {
    renderTimer();

    const startButton = screen.getByLabelText("Start timer");
    fireEvent.click(startButton);

    expect(screen.getByTestId("icon-on")).toBeInTheDocument();
    expect(screen.getByLabelText("Pause timer")).toBeInTheDocument();

    const pauseButton = screen.getByLabelText("Pause timer");
    fireEvent.click(pauseButton);

    expect(screen.getByTestId("icon-off")).toBeInTheDocument();
    expect(screen.getByLabelText("Start timer")).toBeInTheDocument();
  });

  test("resets the timer", () => {
    renderTimer();

    const startButton = screen.getByLabelText("Start timer");
    fireEvent.click(startButton);

    const resetButton = screen.getByLabelText("Reset timer");
    fireEvent.click(resetButton);

    expect(screen.getByText("25:00")).toBeInTheDocument();
  });

  test("increments and decrements timer duration", () => {
    renderTimer();

    const incrementButton = screen.getByLabelText(
      "Increase timer by 5 minutes"
    );
    fireEvent.click(incrementButton);

    expect(screen.getByText("30:00")).toBeInTheDocument();

    const decrementButton = screen.getByLabelText(
      "Decrease timer by 5 minutes"
    );
    fireEvent.click(decrementButton);

    expect(screen.getByText("25:00")).toBeInTheDocument();
  });
});
