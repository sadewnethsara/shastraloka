import { ReactNode } from 'react';
type Overflow = 'normal' | 'breakAll' | 'breakWord' | 'noWrap';
type Size = 'lg' | 'md' | 'sm' | 'xs';
type Props = {
    /**
     * `"start"` and `"end"` should be used for regular alignment since they flip with locale direction. `"forceLeft"` and `"forceRight"` should only be used in special cases where locale direction should be ignored, such as tabular or numeric text. See the [alignment variant](https://gestalt.pinterest.systems/web/text#Alignment) for more details.
     */
    align?: 'start' | 'end' | 'center' | 'forceLeft' | 'forceRight';
    /**
     * The text content to be displayed.
     */
    children?: ReactNode;
    /**
     * The color of the text content. See the [colors variant](https://gestalt.pinterest.systems/web/text#Colors) for more details.
     */
    color?: 'default' | 'disabled' | 'subtle' | 'success' | 'error' | 'warning' | 'shopping' | 'link' | 'inverse' | 'recommendation' | 'light' | 'dark';
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * A unique identifier for the element.
     */
    id?: string;
    /**
     * Indicates how the text should flow with the surrounding content. See the [block vs inline variant](https://gestalt.pinterest.systems/web/text#Block-vs.-inline) for more details.
     */
    inline?: boolean;
    /**
     * Indicates if the text should be displayed in italic. See the [styles variant](https://gestalt.pinterest.systems/web/text#Styles) for more details.
     */
    italic?: boolean;
    /**
     * Visually truncate the text to the specified number of lines. This also adds the `title` attribute if `children` is a string, which displays the full text on hover in most browsers. See the [overflow and truncation variant](https://gestalt.pinterest.systems/web/text#Overflow-and-truncation) for more details.
     */
    lineClamp?: number;
    /**
     * Indicates how the text content should handle overflowing its container. See the [overflow and truncation variant](https://gestalt.pinterest.systems/web/text#Overflow-and-truncation) for more details.
     */
    overflow?: Overflow;
    /**
     * Ref that is forwarded to the underlying element. See the [ref variant](https://gestalt.pinterest.systems/web/text#Refs) for more details.
     */
    ref?: HTMLDivElement;
    /**
     * The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size). See the [sizes variant](https://gestalt.pinterest.systems/web/text#Sizes) for more details.
     */
    size?: Size;
    /**
     * This populates the `title` attribute of the element, which is visible on hover in most browsers. This is useful when truncating the text with `lineClamp` when `children` is a `React.Node`. See the [Title variant](https://gestalt.pinterest.systems/web/text#Title) for more details.
     */
    title?: string;
};
/**
 * [TextUI](https://gestalt.pinterest.systems/web/textui) component is meant to be used when text is interactive, such as a Button text or TextField labels. Compared to the Text component, TextUI is bolder and has a tighter line height.
 *
 * ![Text light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextUI.spec.ts-snapshots/TextUI-chromium-darwin.png)
 * ![Text dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TextUI-dark.spec.ts-snapshots/TextUI-dark-chromium-darwin.png)
 */
declare const TextUIWithForwardRef: import("react").ForwardRefExoticComponent<Omit<Props, "ref"> & import("react").RefAttributes<HTMLDivElement>>;
export default TextUIWithForwardRef;
