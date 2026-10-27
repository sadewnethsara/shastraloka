export declare const KEYS: {
    readonly UP: -1;
    readonly DOWN: 1;
    readonly ENTER: 0;
};
export type DirectionOptionType = -1 | 0 | 1;
type Props = {
    direction: DirectionOptionType;
    containerRef?: {
        current: null | HTMLElement;
    };
    currentHoveredOption: HTMLElement | null | undefined;
};
declare const handleContainerScrolling: ({ direction, containerRef, currentHoveredOption }: Props) => void;
export default handleContainerScrolling;
