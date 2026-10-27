type Props = {
    accessibilityLabel?: string;
    label?: string;
    delay?: boolean;
    show: boolean;
    size?: 'sm' | 'lg';
    color?: 'default' | 'grayscale' | 'white';
};
declare function Spinner({ accessibilityLabel, delay, label, show: showProp, size, color, }: Props): import("react/jsx-runtime").JSX.Element | null;
declare namespace Spinner {
    var displayName: string;
}
export default Spinner;
