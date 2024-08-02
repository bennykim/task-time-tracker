export const isEnterKey = (e: TaskEvent) => {
  return (
    e.type === "keydown" &&
    (e as React.KeyboardEvent).key === "Enter" &&
    !(e as React.KeyboardEvent).nativeEvent.isComposing
  );
};

export const isClick = (e: TaskEvent) => {
  return e.type === "click";
};
