import { ChangeEvent } from "preact/compat";

interface InputGroupProps {
  label: string;
  name: string;
  id: string;
  placeholder: string;
  value: string;
  onInput: (e: ChangeEvent<HTMLInputElement>) => void;
  error: string;
}

const InputGroup = ({
  label,
  name,
  id,
  placeholder,
  value,
  onInput,
  error,
}: InputGroupProps) => (
  <div className="input-group" data-error={error ? "true" : "false"}>
    <label className="input__label" htmlFor={id}>
      {label}
    </label>
    <input
      className="input__field"
      type="number"
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onInput={onInput}
    />
    {error === "empty" && (
      <p className="input__message">This field is required</p>
    )}
    {error === "invalid" && (
      <p className="input__message">Must be a valid {label.toLowerCase()}</p>
    )}
  </div>
);

export default InputGroup;
