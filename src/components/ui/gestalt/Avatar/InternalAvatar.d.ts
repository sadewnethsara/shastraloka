type Props = {
    accessibilityLabel?: string;
    color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    isHovered?: boolean;
    isPressed?: boolean;
    name: string;
    outline?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'fit';
    src?: string;
    verified?: boolean;
};
declare function InternalAvatar(props: Props): import("react/jsx-runtime").JSX.Element;
export default InternalAvatar;
