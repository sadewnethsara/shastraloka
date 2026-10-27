import { ReactNode } from 'react';
import { Dimension, Padding } from '../boxTypes';
type ScrollBoundaryContainerOverflow = 'scroll' | 'scrollX' | 'scrollY' | 'auto' | 'visible';
type InternalProps = {
    children?: ReactNode;
    includesFooter?: boolean;
    height?: Dimension;
    onScroll?: () => void;
    overflow?: ScrollBoundaryContainerOverflow;
    padding?: Padding;
};
declare const ScrollBoundaryContainerWithForwardRef: import("react").ForwardRefExoticComponent<InternalProps & import("react").RefAttributes<HTMLElement>>;
export default ScrollBoundaryContainerWithForwardRef;
