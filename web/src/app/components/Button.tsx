'use client';

import { PropsWithChildren } from 'react';
import { Button as AriaButton } from 'react-aria-components';
import styles from './Button.module.scss';

interface ButtonProps {}

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({ children }) => (
  <AriaButton className={styles.button} onPress={() => alert('Hello world!')}>
    {children}
  </AriaButton>
);

export default Button;
