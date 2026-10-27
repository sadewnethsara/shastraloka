type Props = {
    captionsButton: 'enabled' | 'disabled' | null;
    currentTime: number;
    duration: number;
    fullscreen: boolean;
    onCaptionsChange: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    onFullscreenChange: () => void;
    onPause: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    onPlay: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    onPlayheadDown: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onPlayheadUp: (event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onVolumeChange: (event: React.SyntheticEvent<HTMLDivElement>) => void;
    playing: boolean;
    seek: (time: number) => void;
    volume: number;
};
declare function VideoControls({ captionsButton, currentTime, duration, fullscreen, onCaptionsChange, onFullscreenChange, onPause, onPlay, onPlayheadDown, onPlayheadUp, onVolumeChange, playing, seek, volume, }: Props): import("react/jsx-runtime").JSX.Element;
export default VideoControls;
