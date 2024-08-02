import { useEffect, useState } from "react";

type SettingsFormProps = {
  options: SettingsTimer[];
  unit: string;
  onSave: (newSettings: SettingsTimer[]) => void;
};

export const SettingsForm = ({ options, unit, onSave }: SettingsFormProps) => {
  const [settings, setSettings] = useState(options);

  useEffect(() => {
    setSettings(options);
  }, [options]);

  const handleChangeInput =
    (idx: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const newDuration = parseInt(event.target.value, 10) || 0;
      if (newDuration < 1) return;

      const newSettings = settings.map((option, i) =>
        i === idx
          ? { ...option, value: { ...option.value, duration: newDuration } }
          : option
      );
      setSettings(newSettings);
    };

  const handleUpdateSettings = () => {
    onSave(settings);
  };

  return (
    <div className="section is-centered">
      {settings.map((option, index) => (
        <div key={index} className="field is-horizontal">
          <div className="field-label is-normal">
            <label className="label">{option.label}</label>
          </div>
          <div className="field-body is-flex-grow-4">
            <div className="field">
              <p className="control has-icons-right">
                <input
                  className="input"
                  type="number"
                  value={option.value.duration}
                  onChange={handleChangeInput(index)}
                />
                <span className="icon is-small is-right">{unit}</span>
              </p>
            </div>
          </div>
        </div>
      ))}
      <div className="field is-horizontal mt-6">
        <div className="field-label is-normal" />
        <div className="field-body is-flex-grow-4">
          <button
            className="button is-dark is-fullwidth"
            onClick={handleUpdateSettings}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
