import { ReactNode } from 'react';
import { AriaCurrent } from '../ariaTypes';
import { Rounding } from '../getRoundingClassName';
type Props = {
    accessibilityCurrent?: AriaCurrent;
    accessibilityLabel?: string;
    children?: ReactNode;
    colorClass?: string | Array<string>;
    dataTestId?: string;
    disabled?: boolean;
    download?: boolean | string;
    focusColor?: 'lightBackground' | 'darkBackground';
    fullHeight?: boolean;
    fullWidth?: boolean;
    href: string;
    id?: string;
    innerFocusColor?: 'default' | 'inverse';
    mouseCursor?: 'copy' | 'grab' | 'grabbing' | 'move' | 'noDrop' | 'pointer' | 'zoomIn' | 'zoomOut';
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    onBlur?: (arg1: {
        event: React.FocusEvent<HTMLAnchorElement>;
    }) => void;
    onFocus?: (arg1: {
        event: React.FocusEvent<HTMLAnchorElement>;
    }) => void;
    onKeyDown?: (arg1: {
        event: React.KeyboardEvent<HTMLAnchorElement>;
    }) => void;
    onMouseDown?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
    }) => void;
    onMouseUp?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
    }) => void;
    onMouseEnter?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
    }) => void;
    onMouseLeave?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>;
    }) => void;
    rel?: 'none' | 'nofollow';
    tabIndex: -1 | 0;
    rounding?: Rounding;
    selected?: boolean;
    size?: 'sm' | 'md' | 'lg';
    tapStyle?: 'none' | 'compress';
    target?: null | 'self' | 'blank';
    title?: string;
    wrappedComponent: 'button' | 'iconButton' | 'tapArea' | 'searchGuide';
};
declare const InternalLinkWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLAnchorElement>>;
export default InternalLinkWithForwardRef;
