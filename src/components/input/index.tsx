import { ChangeEvent } from "react";

interface InputProps {
  labelName: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({ ...props }: InputProps): JSX.Element {
  return (
    <div style={{
      marginTop: '10px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      columnGap: '50px',
    }}>
      <label 
        htmlFor={props.labelName}
        style={{
          minWidth: '50px',
          marginBottom: '5px',
        }}>
          {props.labelName}:
      </label>
      <input 
        type="text"
        id={props.labelName}
        name={props.labelName}
        value={props.value}
        onChange={(e) => {props.onChange(e)}}
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '600px',
          border: 'none',
          borderRadius: '4px',
          padding: '8px',
          outline: 'none',
        }}
      />
    </div> 
  )
}
