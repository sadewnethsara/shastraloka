type Props = {
    size?: 'sm' | 'lg';
    dismissButton?: {
        accessibilityLabel?: string;
        onDismiss: () => void;
    };
};
export default function DismissButton({ dismissButton, size }: Props): import("react/jsx-runtime").JSX.Element;
export {};
