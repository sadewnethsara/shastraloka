import { ReactNode } from 'react';
type RequestAnimationFrameProviderProps = {
    children: ReactNode;
};
type RequestAnimationFrameType = {
    handleRequestAnimationFrame: () => void;
    onExternalDismiss: () => void;
};
export default function RequestAnimationFrameProvider({ children, }: RequestAnimationFrameProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useRequestAnimationFrame(): RequestAnimationFrameType;
export {};
