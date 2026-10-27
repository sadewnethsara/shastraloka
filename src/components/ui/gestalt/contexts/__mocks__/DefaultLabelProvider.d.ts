import { ReactNode } from 'react';
import { DefaultLabelContextType } from '../DefaultLabelProvider';
type Props = {
    children: ReactNode;
    labels?: null | DefaultLabelContextType;
};
export default function DefaultLabelProvider({ children, labels }: Props): import("react/jsx-runtime").JSX.Element;
type ValidComponent = keyof DefaultLabelContextType;
export declare function useDefaultLabelContext<C extends ValidComponent>(componentName: C): DefaultLabelContextType[C];
export {};
