type InlineStyle = {
    [key: string]: string | number | undefined;
};
export type Style = {
    className: Set<string>;
    inlineStyle: InlineStyle;
};
export declare const identity: () => Style;
export declare const fromClassName: (...classNames: ReadonlyArray<string>) => Style;
export declare const fromInlineStyle: (inlineStyle: InlineStyle) => Style;
export declare const concat: (styles: ReadonlyArray<Style>) => Style;
export declare const mapClassName: (fn: (x: string) => string) => ((arg1: Style) => Style);
export type ToPropsOutput = {
    className: string | null | undefined;
    style: InlineStyle | null | undefined;
};
export declare const toProps: ({ className, inlineStyle }: Style) => ToPropsOutput;
export {};
