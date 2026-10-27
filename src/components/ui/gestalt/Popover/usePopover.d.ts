import { Placement, Side, Strategy, UseFloatingReturn } from '@floating-ui/react';
type MainDirections = 'up' | 'right' | 'down' | 'left';
export declare const SIDES_MAP: Record<Side, MainDirections>;
interface Props {
    /**
     * Reference element
     */
    anchor?: HTMLElement | null;
    /**
     * Caret (Popover arrow) element
     */
    caretElement?: HTMLElement | null;
    /**
     * Padding between caret and the *edges* of Popover. This will prevent caret from overflowing the corners
     */
    caretPadding?: number;
    /**
     * Container element in which Popover flips directions or shifts itself upon reaching its viewport boundaries.
     * Default is window viewport.
     */
    scrollBoundary?: HTMLElement | null;
    /**
     * Specifies the preferred position of Popover relative to its anchor element.
     */
    direction?: Placement;
    /**
     * Forces the position of Popover relative to its anchor element.
     */
    forceDirection?: boolean;
    /**
     * Type of CSS position property to use.
     * Deafult is `absolute`
     */
    strategy?: Strategy;
    /**
     * Whether to hide Popover when reference element gets out of viewport.
     */
    hideWhenReferenceHidden?: boolean;
    /**
     * Callback fired when Popover is correctly positioned after it's mounted.
     */
    onPositioned?: () => void;
}
export default function usePopover({ anchor, caretElement, caretPadding, direction, forceDirection, strategy, scrollBoundary, hideWhenReferenceHidden, onPositioned, }: Props): UseFloatingReturn;
export {};
