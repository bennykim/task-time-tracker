import { CircleCheck, CircleChecked } from "@/components";

type CheckBoxProps = { checked: boolean; onChange: (props: boolean) => void };

export const CheckBox = ({ checked, onChange }: CheckBoxProps) => {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <span
      role="checkbox"
      aria-checked={checked}
      className="is-clickable"
      style={{ fontSize: 0 }}
      onClick={toggleCheckbox}
    >
      {checked ? <CircleChecked /> : <CircleCheck />}
    </span>
  );
};
