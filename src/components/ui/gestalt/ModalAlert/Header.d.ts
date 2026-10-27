type Props = {
    accessibilityDismissButtonLabel: string;
    type: 'default' | 'warning' | 'error';
    heading: string;
    onDismiss: () => void;
};
export default function ModalAlertHeader({ accessibilityDismissButtonLabel, type, heading, onDismiss, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
