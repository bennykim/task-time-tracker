export const generateTimerFormOptions = (taskTimers: Timer[]) => {
  return taskTimers.map((task) => ({
    label: task.title,
    value: task,
  }));
};

export const parseTimerFromSettings = (
  SettingsTimers: SettingsTimer[]
): Timer[] => {
  return SettingsTimers.map((setting) => setting.value);
};
