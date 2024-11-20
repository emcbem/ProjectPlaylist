import { FC } from "react";

interface props {
  setCheckbox: (checked: boolean) => void;
  title: string;
  isChecked: boolean;
}

const EditGoalCheckbox: FC<props> = ({ setCheckbox, title, isChecked }) => {
  return (
    <div className="p-1">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setCheckbox(e.target.checked)}
        />
        <span className="ml-2">{title}</span>
      </label>
    </div>
  );
};

export default EditGoalCheckbox;
