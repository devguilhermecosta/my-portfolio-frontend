import { CSSProperties } from 'react';
import Style from './callMeButton.module.css';

interface CallMeButtonProps extends CSSProperties {

}

export default function CallMeButton({ ...props }: CallMeButtonProps): JSX.Element {
  return(
    <>
      <button className={Style.C_button} style={{ ...props }}>
        fale comigo
      </button>
    </>
  )
}