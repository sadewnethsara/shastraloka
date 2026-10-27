import { ReactNode } from 'react';
type Props = {
    children?: ReactNode;
    closeOnOutsideClick: boolean;
    onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
};
declare function Backdrop({ children, closeOnOutsideClick, onClick }: Props): import("react/jsx-runtime").JSX.Element;
export default Backdrop;
