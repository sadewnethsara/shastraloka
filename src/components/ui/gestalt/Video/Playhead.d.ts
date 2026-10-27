import { PureComponent } from 'react';
type Props = {
    accessibilityProgressBarLabel: string;
    currentTime: number;
    duration: number;
    onPlayheadDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onPlayheadUp: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    seek: (time: number) => void;
};
type State = {
    seeking: boolean;
};
export default class VideoPlayhead extends PureComponent<Props, State> {
    playhead: HTMLDivElement | null | undefined;
    state: State;
    setPlayheadRef: (ref?: HTMLDivElement | null | undefined) => void;
    seek: (clientX: number) => void;
    stopClick: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    handleMouseDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    handleMouseLeave: (event: React.MouseEvent<HTMLDivElement>) => void;
    handleMouseMove: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    handleMouseUp: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    render(): import("react/jsx-runtime").JSX.Element;
}
export {};
