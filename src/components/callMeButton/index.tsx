import { CSSProperties } from 'react';
import Style from './callMeButton.module.css';

interface CallMeButtonProps extends CSSProperties {
  text?: string;
  style?: CSSProperties;
  onClick: () => void;
}

export default function CallMeButton({ text, style, onClick }: CallMeButtonProps): JSX.Element {
  return(
    <>
      <button className={Style.C_button} style={style} onClick={() => onClick()}>
        {!text ? 'fale comigo' : text}
      </button>
    </>
  )
}