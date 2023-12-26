interface ButtonProps {
  value?: string;
  position?: PositionProps;
  onClick: () => void;
}

type PositionProps = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

export default function Button({ ...props }: ButtonProps): JSX.Element {
  return (
    <button 
      onClick={props.onClick}
      style={{
        backgroundColor: 'var(--contrast-l1)',
        color: 'var(--secondaire-std)',
        padding: '10px',
        border: 'none',
        borderRadius: props.value ? '4px' : '50%',
        width: 'fit-content',
        height: 'fit-content',
        opacity: .5,
        position: 'fixed',
        cursor: 'pointer',
        top: props.position === 'top-left' || props.position === 'top-right' ? '10px' : 'none',
        left: props.position === 'top-left' || props.position === 'bottom-left' ? '10px' : 'none',
        right: props.position === 'top-right' || props.position === 'bottom-right' ? '10px' : 'none',
        bottom: props.position === 'bottom-left' || props.position === 'bottom-right' ? '10px' : 'none',
      }}
      >
      {props.value ? props.value : '<'}
    </button>
  )
}