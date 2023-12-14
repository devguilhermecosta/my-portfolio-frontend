import { ReactNode } from "react";
import Style from './spaceSection.module.css';

interface SectionProps {
  children: ReactNode;
}

export default function SpaceSection({ children }: SectionProps): JSX.Element {
  return(
    <section className={Style.C_container}>
      { children }
    </section>
  )
}