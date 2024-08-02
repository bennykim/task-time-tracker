import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import * as Icons from "@/components";
import {
  MAX_PROGRESS,
  TASK_TYPE_WORK,
  TIME_STATE_PAUSE,
  TIME_STATE_READY,
  TIME_STATE_START,
} from "@/constants";
import { useTimer } from "@/hooks";
import { TaskTimerContext } from "@/provider";
import {
  formatRemainingTime,
  minutesToSeconds,
  showDocumentTitle,
} from "@/utils";

type TimerProps = {
  type: TaskType;
  duration: number;
  step: number;
};

const BUTTON_STYLES = {
  active: "is-danger",
  inactive: "is-primary",
};

export const Timer = ({ type, duration, step }: TimerProps) => {
  const { tasks, updateTasks } = useContext(TaskTimerContext);
  const {
    seconds,
    isActive,
    totalSeconds,
    toggleTimer,
    resetTimer,
    changeTimerDuration,
  } = useTimer(minutesToSeconds(duration));
  const prevSeconds = useRef(seconds);
  const [timeState, setTimeState] = useState<TimeState>(TIME_STATE_READY);

  const getIcon = useCallback(() => {
    if (!isActive) return <Icons.Off />;
    return type === TASK_TYPE_WORK ? <Icons.On /> : <Icons.Break />;
  }, [isActive, type]);

  const processTimerDisplay = useCallback(() => {
    const timeString = formatRemainingTime(seconds);
    showDocumentTitle(timeString, type);
    return timeString;
  }, [seconds, type]);

  useEffect(() => {
    setTimeState((prevState: TimeState) => {
      if (prevState === TIME_STATE_READY && isActive) return TIME_STATE_START;
      if (prevState === TIME_STATE_START && !isActive) return TIME_STATE_PAUSE;
      if (prevState === TIME_STATE_PAUSE && isActive) return TIME_STATE_START;
      return prevState;
    });
  }, [isActive]);

  useEffect(() => {
    if (
      tasks.length > 0 &&
      timeState === TIME_STATE_START &&
      prevSeconds.current !== seconds &&
      seconds !== 0 &&
      totalSeconds !== seconds
    ) {
      updateTasks(
        tasks.map((task) =>
          task.completed
            ? task
            : { ...task, totalDuration: task.totalDuration + 1 }
        )
      );
    }
    prevSeconds.current = seconds;
  }, [tasks, timeState, seconds, totalSeconds]);

  useEffect(() => {
    changeTimerDuration(duration - totalSeconds);
  }, [duration, totalSeconds, changeTimerDuration]);

  const handleIncrementDecrement = useCallback(
    (stepValue: number) => () => changeTimerDuration(stepValue),
    [changeTimerDuration]
  );

  const progress = useMemo(
    () => (seconds / totalSeconds) * MAX_PROGRESS,
    [seconds, totalSeconds]
  );

  const buttonClassName = isActive
    ? BUTTON_STYLES.active
    : BUTTON_STYLES.inactive;
  const bouncingClass = isActive ? "bouncing" : "";
  const activeHiddenClass = isActive ? "" : "is-hidden";
  const secondsHiddenClass = seconds === 0 ? "is-hidden" : "";

  return (
    <div className="container">
      <div className={`is-flex is-justify-content-center ${bouncingClass}`}>
        {getIcon()}
      </div>
      <div className="columns is-centered mb-6">
        <div className="column">
          <div className="has-text-centered mb-6">
            <span
              className="title has-text-primary-00 has-text-weight-semibold"
              style={{ fontSize: "90px" }}
            >
              {processTimerDisplay()}
            </span>
          </div>
          <div className="columns is-centered">
            <div className="buttons are-large">
              <button
                className={`tag is-black is-medium is-rounded has-text-weight-semibold mr-2 ${activeHiddenClass}`}
                onClick={handleIncrementDecrement(-step)}
                aria-label={`Decrease timer by ${step} minutes`}
              >
                - {step}
              </button>
              <button
                className={`button has-text-weight-semibold ${buttonClassName} ${secondsHiddenClass}`}
                onClick={toggleTimer}
                aria-label={isActive ? "Pause timer" : "Start timer"}
              >
                {isActive ? (
                  <Icons.Pause aria-hidden="true" />
                ) : (
                  <Icons.Play aria-hidden="true" />
                )}
              </button>
              <button
                className="button is-light has-text-weight-semibold"
                onClick={resetTimer}
                aria-label="Reset timer"
              >
                <Icons.Reset aria-hidden="true" />
              </button>
              <button
                className={`tag is-black is-medium is-rounded has-text-weight-semibold ml-2 ${activeHiddenClass}`}
                onClick={handleIncrementDecrement(step)}
                aria-label={`Increase timer by ${step} minutes`}
              >
                + {step}
              </button>
            </div>
          </div>
        </div>
      </div>
      <progress
        className="progress is-primary"
        style={{ height: 6 }}
        value={progress}
        max={MAX_PROGRESS}
      />
    </div>
  );
};
