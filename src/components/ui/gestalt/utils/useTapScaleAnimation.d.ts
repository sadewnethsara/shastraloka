export default function useTapScaleAnimation(): {
    elementRef: import("react").MutableRefObject<HTMLDivElement | null>;
    classes: string;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleKeyDown: (event: React.KeyboardEvent) => void;
    handleKeyUp: (event: React.KeyboardEvent) => void;
};
