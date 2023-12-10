import { ChangeEvent } from "react";
import Style from './textarea.module.css';

interface TextAreaProps {
  label: string;
  value?: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea({ label, value, error, onChange }: TextAreaProps): JSX.Element {
  const borderError = '2px solid red';

  return (
    <div className={Style.C_textarea}>
      <label htmlFor={label}>{label}:</label>
      <textarea
        name={label}
        id={label}
        value={value ? value : ''}
        onChange={(e) => onChange(e)}
        style={{ border: error ? borderError : 'none' }}
      />
    </div>
  )
}

//TODO make all tests to thi component