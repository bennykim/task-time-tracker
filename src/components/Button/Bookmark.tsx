type BookmarkProps = {
  position: Position;
  text: string;
  color: string;
  onClick: () => void;
};

export const Bookmark = ({ position, text, color, onClick }: BookmarkProps) => {
  return (
    <button
      className={`bookmark button has-background-${color}-40 has-text-primary-00 ${position} ${color}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
