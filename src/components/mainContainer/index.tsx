import { StyledMain } from "./syled";
import { ReactNode } from "react";
import React from "react";

type IntrinsicAttributes = React.CSSProperties;

export default function MainContainer({ children, ...props }: IntrinsicAttributes & { children: ReactNode; }): JSX.Element {
  return (
    <StyledMain id='container' style={{ ...props }}>
      { children }
    </StyledMain>
  )
}