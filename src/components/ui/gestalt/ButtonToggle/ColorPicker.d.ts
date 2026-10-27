declare const skinColor: {
    readonly skinTone1: "#F0E3DC";
    readonly skinTone2: "#F8D7D8";
    readonly skinTone3: "#F2D7BE";
    readonly skinTone4: "#F7C3AF";
    readonly skinTone5: "#DEBAB0";
    readonly skinTone6: "#E0999A";
    readonly skinTone7: "#DDA67C";
    readonly skinTone8: "#D98A64";
    readonly skinTone9: "#9A6B52";
    readonly skinTone10: "#A25847";
    readonly skinTone11: "#B37143";
    readonly skinTone12: "#BF6951";
    readonly skinTone13: "#683929";
    readonly skinTone14: "#34261F";
    readonly skinTone15: "#64281B";
    readonly skinTone16: "#4F2221";
};
export type SkinColor = keyof typeof skinColor | string;
export type Props = {
    colors: ReadonlyArray<string>;
    selected: boolean;
    size: 'sm' | 'md' | 'lg';
    disabled: boolean;
    isHovered: boolean;
    isFocused: boolean;
};
export default function ColorPicker({ colors, selected, isHovered, isFocused, size }: Props): import("react/jsx-runtime").JSX.Element;
export {};
