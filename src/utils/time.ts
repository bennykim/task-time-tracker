export function formatRemainingTime(seconds: number) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const minsStr = mins.toString().padStart(2, "0");
  const secsStr = secs.toString().padStart(2, "0");
  return `${minsStr}:${secsStr}`;
}

export function minutesToSeconds(duration: number) {
  return duration * 60;
}

export const showDocumentTitle = (time: string, type: TaskType) => {
  document.title = `${time} - time to ${type}`;
};
