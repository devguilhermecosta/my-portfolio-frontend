interface ButtonProps {
  value?: string;
  onClick: () => void;
}

export default function BackButton({ ...props }: ButtonProps): JSX.Element {
  return (
    <button 
      onClick={props.onClick}
      style={{
        backgroundColor: 'var(--contrast-l1)',
        color: 'var(--secondaire-std)',
        padding: '10px',
        border: 'none',
        borderRadius: props.value ? '4px' : '50%',
        width: props.value ? 'fit-content' : '40px',
        height: props.value ? 'fit-content' : '40px',
        opacity: .5,
        position: 'fixed',
        top: '10px',
        left: '10px',
        cursor: 'pointer',
      }}
      >
      {props.value ? props.value : '<'}
    </button>
  )
}