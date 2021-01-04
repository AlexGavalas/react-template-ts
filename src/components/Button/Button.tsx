import { FC } from 'react';

interface ButtonProps {
    onClick?: () => void;
}

export const Button: FC<ButtonProps> = ({ children, onClick }) => {
    return <button onClick={onClick}>{children}</button>;
};
