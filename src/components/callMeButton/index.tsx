import { CSSProperties } from 'react';
import Style from './callMeButton.module.css';

interface CallMeButtonProps extends CSSProperties {
  text?: string;
  style?: CSSProperties;
}

export default function CallMeButton({ text, style }: CallMeButtonProps): JSX.Element {
  return(
    <>
      <button className={Style.C_button} style={style}>
        {!text ? 'fale comigo' : text}
      </button>
    </>
  )
}