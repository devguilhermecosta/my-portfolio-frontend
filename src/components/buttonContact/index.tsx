import { Link } from "react-router-dom";
import Style from './buttonContact.module.css';

interface ButtonProps {
  image: string;
  text: string;
  backgroundColor: string;
  color: string;
  href: string;
  target?: string;
  testId?: string;
}

export default function ButtonContact({ ...props }: ButtonProps): JSX.Element {{
  return (
    <Link 
      to={props.href} 
      target={props.target} 
      className={Style.Button} 
      style={{
        backgroundColor: `${ props.backgroundColor }`,
        color: `${ props.color }`,
      }}
      data-testid={props.testId}
    >
      <img src={props.image} alt={`logo of ${props.text}`} style={{ width: '30px', height: '30px' }} />
      <p>{props.text}</p>
    </Link>
  )
}}