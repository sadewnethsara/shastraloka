import { ReactNode } from 'react';
export declare const ANIMATION_STATE: {
    readonly animatedOpening: "animatedOpening";
    readonly animatedClosing: "animatedClosing";
    readonly unmount: "unmount";
    readonly hidden: "hidden";
};
export type AnimationStateType = null | 'animatedOpening' | 'animatedClosing' | 'unmount' | 'hidden';
type UseAnimationType = {
    animationState: AnimationStateType;
    setAnimationState: (arg1: AnimationStateType) => void;
    handleAnimationEnd: () => void;
    handleExternalDismiss: () => void;
};
type AnimationProviderProps = {
    children: ReactNode;
};
export default function AnimationProvider({ children }: AnimationProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useAnimation(): UseAnimationType;
export {};
