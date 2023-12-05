export default function SubmitInput({ value }: { value?: string }): JSX.Element {
  return (
    <input 
    type="submit" 
    value={!value ? 'save' : value}
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
    }}/>
  )
}