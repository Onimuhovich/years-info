import React from 'react';
import * as styles from "./nav-button.module.scss";
import cn from "classnames";

type TProps = React.ButtonHTMLAttributes<HTMLButtonElement>

const NavButton: React.FC<TProps> = ({
  className,
  ...props
}) => {
  return (
    <button className={cn(styles.parent, className)} {...props}>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="currentColor" strokeWidth="2"/>
      </svg>
    </button>
  )
}

export default NavButton;
