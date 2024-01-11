interface Inputprops {
  name: string;
  value: boolean;
  displayLabelValue: string;
  onClick: () => void;
}

export default function InputCheckbox(props: Inputprops): JSX.Element {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: 10,
    }}>
      <label htmlFor={props.name}>{props.displayLabelValue}</label>
      <input 
        type="checkbox" 
        name={props.name}
        id={props.name}
        value={`${props.value}`}
        checked={props.value}
        onClick={() => props.onClick()}
      />
    </div>
  )
}