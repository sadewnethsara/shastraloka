import { ReactNode } from 'react';
import { Indexable } from '../zIndex';
type Props = {
    accessibilityLabel?: string;
    children?: ReactNode;
    dataTestId?: string;
    /**
     * Whether to show the tooltip or not
     */
    disabled?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    inline?: boolean;
    link?: ReactNode;
    text: string | ReadonlyArray<string>;
    zIndex?: Indexable;
};
declare function InternalTooltip({ accessibilityLabel, children, dataTestId, disabled, link, idealDirection, inline, text, zIndex, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace InternalTooltip {
    var displayName: string;
}
export default InternalTooltip;
