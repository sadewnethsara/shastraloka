type Props = {
    anchor: HTMLElement | null | undefined;
    message?: string;
    onDismiss: () => void;
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
    subtext?: string;
};
export default function ConfirmationPopover({ anchor, message, subtext, primaryAction, secondaryAction, onDismiss, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
