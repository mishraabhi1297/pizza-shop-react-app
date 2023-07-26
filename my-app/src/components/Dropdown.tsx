export interface IDropdownOption {
  value: string;
  label: string;
}

interface IDropdownProps {
  options: IDropdownOption[];
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FC<IDropdownProps> = (props) => {
  return (
    <select onChange={props.onChange}>
      <option value="">Select an option</option>
      {props.options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
