import compactIconsClassic from '../icons/compact/index';
import icons from '../icons/index';
type Props = {
    accessibilityLabel?: string;
    active?: boolean;
    focusColor?: 'lightBackground' | 'darkBackground';
    bgColor?: 'transparent' | 'transparentDarkBackground' | 'transparentDarkGray' | 'gray' | 'lightGray' | 'washLight' | 'white' | 'red' | 'elevation';
    disabled?: boolean;
    dangerouslySetSvgPath?: {
        __path: string;
    };
    focused?: boolean;
    hovered?: boolean;
    icon?: keyof typeof icons | keyof typeof compactIconsClassic;
    iconColor?: 'gray' | 'darkGray' | 'red' | 'white' | 'brandPrimary' | 'light' | 'dark';
    padding?: 1 | 2 | 3 | 4 | 5;
    rounding?: '0' | '100' | '200' | '300' | '400' | '500' | 'circle';
    selected?: boolean;
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 56;
};
export default function InternalPog({ accessibilityLabel, active, bgColor, focusColor, dangerouslySetSvgPath, disabled, focused, hovered, icon, iconColor, padding, rounding, selected, size, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
