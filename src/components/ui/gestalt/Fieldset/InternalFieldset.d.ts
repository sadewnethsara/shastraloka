import { ReactNode } from 'react';
type Props = {
    children: ReactNode;
    id?: string;
    errorMessage?: string;
    legend: string;
    legendDisplay?: 'visible' | 'hidden';
    helperText?: string;
    marginTop?: boolean;
};
declare function InternalFieldset({ id, errorMessage, legend, legendDisplay, children, helperText, marginTop, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace InternalFieldset {
    var displayName: string;
}
export default InternalFieldset;
