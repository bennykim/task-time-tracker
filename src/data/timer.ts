import {
  BREAK_LONG,
  BREAK_SHORT,
  TASK_TIMER,
  TASK_TYPE_BREAK,
  TASK_TYPE_WORK,
  THEME_BLUE,
  THEME_PINK,
  THEME_YELLOW,
} from "@/constants";

export const timerData = [
  {
    type: TASK_TYPE_WORK,
    title: TASK_TIMER,
    duration: 25,
    theme: THEME_PINK,
    step: 5,
  },
  {
    type: TASK_TYPE_BREAK,
    title: BREAK_SHORT,
    duration: 5,
    theme: THEME_BLUE,
    step: 1,
  },
  {
    type: TASK_TYPE_BREAK,
    title: BREAK_LONG,
    duration: 10,
    theme: THEME_YELLOW,
    step: 1,
  },
];
