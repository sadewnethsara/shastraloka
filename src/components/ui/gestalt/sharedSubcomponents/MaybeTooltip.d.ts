import { ReactElement } from 'react';
import { Indexable } from '../zIndex';
type TooltipProps = {
    accessibilityLabel?: string;
    inline?: boolean;
    idealDirection?: 'up' | 'right' | 'down' | 'left';
    text: string | ReadonlyArray<string>;
    zIndex?: Indexable;
};
export default function MaybeTooltip({ children, disabled, tooltip, }: {
    children: ReactElement;
    disabled?: boolean;
    tooltip?: TooltipProps;
}): import("react/jsx-runtime").JSX.Element;
export {};
