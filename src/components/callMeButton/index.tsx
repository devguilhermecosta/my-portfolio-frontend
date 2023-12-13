import { CSSProperties } from 'react';

interface CallMeButtonProps extends CSSProperties {

}

export default function CallMeButton({ ...props }: CallMeButtonProps): JSX.Element {
  return(
    <>
      <button style={{
        width: '100%',
        maxWidth: '400px',
        padding: '10px',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
        borderRadius: '4px',
        backgroundColor: 'var(--contrast-std)',
        color: 'var(--secondaire-std)',
        ...props,
      }}>
        fale comigo
      </button>
    </>
  )
}