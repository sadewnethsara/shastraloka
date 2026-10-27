import { ReactNode } from 'react';
type Props = {
    children?: ReactNode;
    footer?: ReactNode;
    padding?: 'default' | 'none';
    header: ReactNode;
};
export default function ContentContainer({ children, header, footer, padding }: Props): import("react/jsx-runtime").JSX.Element;
export {};
