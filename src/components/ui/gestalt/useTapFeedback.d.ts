type TapTargetHTMLElement = HTMLDivElement | HTMLAnchorElement;
export declare const keyPressShouldTriggerTap: (event: React.KeyboardEvent<HTMLDivElement> | React.KeyboardEvent<HTMLAnchorElement>) => boolean;
export default function useTapFeedback({ height, width, }: {
    height: number | null | undefined;
    width: number | null | undefined;
}): {
    compressStyle: {
        transform: string;
    } | null | undefined;
    handleBlur: () => void;
    handleMouseDown: () => void;
    handleMouseUp: () => void;
    handleTouchCancel: () => void;
    handleTouchEnd: () => void;
    handleTouchMove: (arg1: React.TouchEvent<TapTargetHTMLElement>) => void;
    handleTouchStart: (arg1: React.TouchEvent<TapTargetHTMLElement>) => void;
    isTapping: boolean;
};
export {};
