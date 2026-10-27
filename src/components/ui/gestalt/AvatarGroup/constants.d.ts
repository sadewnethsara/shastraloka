export type Size = 'xs' | 'sm' | 'md' | 'fit';
export declare const SIZE_MAP: {
    readonly xs: 24;
    readonly sm: 32;
    readonly md: 48;
    readonly fit: "100%";
};
export type BaseStackType = {
    hovered?: boolean;
    pileCount: number;
    size: Size;
};
