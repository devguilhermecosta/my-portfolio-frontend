interface SubmitProps {
  value?: string;
  onClick?: () => void;
}

export default function SubmitInput({ ...props }: SubmitProps): JSX.Element {
  return (
    <input 
    type="submit" 
    value={!props.value ? 'save' : props.value}
    style={{
      marginTop: '15px',
      width: '100%',
      padding: '8px',
      borderRadius: '4px',
      border: 'none',
      outline: 'none',
      backgroundColor: 'var(--contrast-std)',
      color: 'var(--secondaire-l1)',
      cursor: 'pointer',
    }}
    onClick={props.onClick}
    />
  )
}