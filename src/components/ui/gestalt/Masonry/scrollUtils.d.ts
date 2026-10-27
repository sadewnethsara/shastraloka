/**
 * Measuring scroll positions, element heights, etc is different between
 * different browsers and the window object vs other DOM nodes. These
 * utils abstract away these differences.
 */
export declare function getElementHeight(element: HTMLElement | Window): number;
export declare function getWindowScrollPos(): number;
export declare function getRelativeScrollTop(element: HTMLElement | Window): number;
export declare function getScrollHeight(element: HTMLElement): number;
export declare function getScrollPos(element: HTMLElement | Window): number;
