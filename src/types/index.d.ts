type ThemeColor = typeof THEME_PINK | typeof THEME_BLUE | typeof THEME_YELLOW;

type Position = typeof LEFT | typeof RIGHT;

type TaskType = typeof TASK_TYPE_WORK | typeof TASK_TYPE_BREAK;

type TaskTitle = typeof TASK_TIMER | typeof BREAK_SHORT | typeof BREAK_LONG;

type IconName = typeof ICON_SUN | typeof ICON_MOON | typeof ICON_CLOUD;

type TimeState =
  | typeof TIME_STATE_READY
  | typeof TIME_STATE_START
  | typeof TIME_STATE_PAUSE;

type Task = {
  id: number;
  text: string;
  completed: boolean;
  createdAt: string;
  totalDuration: number;
};

type TaskEvent =
  | React.MouseEvent<HTMLButtonElement>
  | React.KeyboardEvent<HTMLInputElement>;

type Timer = {
  type: TaskType;
  title: TaskTitle;
  duration: number;
  theme: ThemeColor;
  step: number;
};

type SettingsTimer = {
  label: string;
  value: Timer;
};

type TaskTimerDatabase = Task[] | Timer[];

type SunTimes = {
  sunrise: string;
  sunset: string;
};

type Coordinates = {
  latitude: number;
  longitude: number;
};
