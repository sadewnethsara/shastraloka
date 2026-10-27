import { ReactNode } from 'react';
export declare const PADDING_BOINTS = 6;
type NodeOrRenderProp = ReactNode | ((arg1: {
    onDismissStart: () => void;
}) => ReactNode);
type InternalSheetProps = {
    accessibilityDismissButtonLabel?: string;
    accessibilityLabel: string;
    children: NodeOrRenderProp;
    closeOnOutsideClick: boolean;
    footer: NodeOrRenderProp;
    heading?: string;
    onAnimationEnd: (arg1: {
        animationState: 'in' | 'out';
    }) => void | null | undefined;
    onDismiss: () => void;
    dismissConfirmation?: {
        message?: string;
        subtext?: string;
        primaryAction?: {
            accessibilityLabel?: string;
            text?: string;
            onClick?: (arg1: {
                event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>;
            }) => void;
        };
        secondaryAction?: {
            accessibilityLabel?: string;
            text?: string;
            onClick?: (arg1: {
                event: React.MouseEvent<HTMLButtonElement> | React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLButtonElement>;
            }) => void;
        };
    };
    size: 'sm' | 'md' | 'lg';
    subHeading: NodeOrRenderProp;
};
export default function InternalOverlayPanel({ accessibilityDismissButtonLabel, accessibilityLabel, children, closeOnOutsideClick, dismissConfirmation, footer, heading, onAnimationEnd, onDismiss, size, subHeading, }: InternalSheetProps): import("react/jsx-runtime").JSX.Element;
export {};
