import { useCallback } from "react";

type TabProps = {
  data: Timer[];
  selected: Timer;
  onClick: (props: Timer) => void;
};

export const Tabs = ({ data, selected, onClick }: TabProps) => {
  const handleClick = useCallback(
    (item: Timer) => () => {
      onClick(item);
    },
    [onClick]
  );

  return (
    <div className="tabs is-centered is-large">
      <ul>
        {data.map((item, idx) => (
          <li
            key={idx}
            className={item.title === selected.title ? "is-active" : ""}
          >
            <a className="has-text-weight-semibold" onClick={handleClick(item)}>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
