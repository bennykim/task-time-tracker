import { Fragment, useCallback, useContext, useEffect, useState } from "react";

import {
  Bookmark,
  Box,
  Firecracker,
  SideBar,
  Tabs,
  TaskTable,
  Tasks,
  Timer,
} from "@/components";
import { SettingsForm } from "@/components/Form";
import { LEFT, RIGHT, TASK_STORE, TIMER_STORE } from "@/constants";
import { useDatabaseTasks, useDatabaseTimer, useThemeSwitcher } from "@/hooks";
import { TaskTimerContext } from "@/provider";
import { generateTimerFormOptions, parseTimerFromSettings } from "@/utils";

const TaskTimer = () => {
  const { switchTheme } = useThemeSwitcher();
  const { database } = useContext(TaskTimerContext);

  const {
    tasks: completedTasks,
    loadTasks,
    addTasks,
    deleteTaskById,
  } = useDatabaseTasks(database, TASK_STORE);
  const {
    timers: savedTimers,
    loadTimers,
    updateTimers,
  } = useDatabaseTimer(database, TIMER_STORE);

  const [activeDataModal, setActiveDataModal] = useState(false);
  const [activeOptionModal, setActiveOptionModal] = useState(false);
  const [activeTab, setActiveTab] = useState(savedTimers[0]);
  const [showFirecracker, setShowFirecracker] = useState(false);

  useEffect(loadTasks, [loadTasks]);
  useEffect(loadTimers, [loadTimers]);

  useEffect(() => {
    switchTheme(activeTab.theme);
  }, [activeTab, switchTheme]);

  const clearCompletedTasks = (tasks: Task[]) => {
    setShowFirecracker(true);
    addTasks(tasks);
  };

  const handleCreateOptions = useCallback(() => {
    return generateTimerFormOptions(savedTimers);
  }, [savedTimers]);

  const handleUpdateTaskTimers = useCallback(
    (taskTimers: SettingsTimer[]) => {
      const updatedTaskTimers = parseTimerFromSettings(taskTimers);
      updateTimers(updatedTaskTimers);
      setActiveTab(
        (prev) =>
          updatedTaskTimers.find(({ title }) => title === prev.title) || prev
      );
      setActiveOptionModal(false);
    },
    [updateTimers]
  );

  const toggleActiveDataModal = (state: boolean) => () => {
    setActiveDataModal(state);
  };

  const toggleActiveOptionModal = (state: boolean) => () => {
    setActiveOptionModal(state);
  };

  const toggleFirecracker = (state: boolean) => () => {
    setShowFirecracker(state);
  };

  return (
    <Fragment>
      <Bookmark
        position={LEFT}
        text="🧰"
        color="info"
        onClick={toggleActiveDataModal(true)}
      />
      <Bookmark
        position={RIGHT}
        text="⚙️"
        color="text"
        onClick={toggleActiveOptionModal(true)}
      />
      <div className="is-widescreen min-w-770">
        <div className="container">
          <div className="section">
            <Tabs
              data={savedTimers}
              selected={activeTab}
              onClick={setActiveTab}
            />
          </div>
          <div className="section">
            <div className="columns is-mobile is-centered">
              <div className="column is-half">
                <Box>
                  <Timer
                    type={activeTab.type}
                    duration={activeTab.duration}
                    step={activeTab.step}
                  />
                </Box>
              </div>
            </div>
          </div>
          <div className="section">
            <Tasks onClear={clearCompletedTasks} />
            <Firecracker
              show={showFirecracker}
              onDone={toggleFirecracker(false)}
            />
          </div>
        </div>
      </div>
      <SideBar show={activeDataModal} position={LEFT}>
        <SideBar.Header
          title="Completed Tasks"
          onClose={toggleActiveDataModal(false)}
        />
        <SideBar.Body>
          <TaskTable
            color="info"
            table={{
              thead: ["Time", "Session", "Title"],
              tbody: completedTasks,
            }}
            onDelete={deleteTaskById}
          />
        </SideBar.Body>
      </SideBar>
      <SideBar show={activeOptionModal} position={RIGHT}>
        <SideBar.Header
          title="Settings"
          onClose={toggleActiveOptionModal(false)}
        />
        <SideBar.Body>
          <SettingsForm
            options={handleCreateOptions()}
            unit="(m)"
            onSave={handleUpdateTaskTimers}
          />
        </SideBar.Body>
      </SideBar>
    </Fragment>
  );
};

export default TaskTimer;
