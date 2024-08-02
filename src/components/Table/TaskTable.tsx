import { useContext } from "react";
import { Fragment } from "react/jsx-runtime";

import * as Icon from "@/components/Icon";
import { TaskTimerContext } from "@/provider";
import { formatRemainingTime } from "@/utils";

type TaskTableProps = {
  color: string;
  table: {
    thead: string[];
    tbody: Task[];
  };
  onDelete: (id: Task["id"]) => void;
};

export const TaskTable = ({ color, table, onDelete }: TaskTableProps) => {
  const { coords } = useContext(TaskTimerContext);

  return (
    <Fragment>
      {table.tbody.length > 0 ? (
        <table className={`table has-background-${color}-40 is-fullwidth`}>
          <thead>
            <tr>
              {table.thead.map((head) => (
                <th key={head} className="has-text-primary-00">
                  {head}
                </th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {table.tbody.map((body, idx) => (
              <tr key={idx}>
                <td className="has-text-weight-medium has-text-primary-00 is-vcentered">
                  <div className="is-flex">
                    <Icon.SunTimes coords={coords} dateTime={body.createdAt} />
                    <span>{body.createdAt}</span>
                  </div>
                </td>
                <td className="has-text-weight-medium has-text-primary-00 is-vcentered">
                  {formatRemainingTime(body.totalDuration)}
                </td>
                <td className="has-text-weight-medium has-text-primary-00 is-vcentered">
                  {body.text}
                </td>
                <td className="is-vcentered">
                  <button
                    className="button is-small"
                    onClick={() => onDelete(body.id)}
                  >
                    Del
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="notification is-primary has-text-weight-semibold">
          No Completed Tasks
        </div>
      )}
    </Fragment>
  );
};
