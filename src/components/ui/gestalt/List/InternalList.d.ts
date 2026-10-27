import { ReactElement, ReactNode } from 'react';
type ListType = 'bare' | 'ordered' | 'unordered';
type Size = '100' | '200' | '300' | '400' | '500' | '600';
type Props = {
    /**
     * Use List.Item to build lists. See [subcomponents](https://gestalt.pinterest.systems/web/list#List.Item).
     */
    children: ReactNode;
    /**
     * The label for the list. Be sure to localize the text. See the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
     */
    label?: string | ReactElement;
    /**
     * Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [accessibility section](https://gestalt.pinterest.systems/web/list#Accessibility) and the [label variant](https://gestalt.pinterest.systems/web/list#Text-and-label) for guidance.
     */
    labelDisplay?: 'visible' | 'hidden';
    /**
     * The spacing used in List. See the [spacing variant](https://gestalt.pinterest.systems/web/list#Spacing) for guidance.
     */
    spacing?: 'regular' | 'condensed';
    /**
     *The sizes are based on our [font-size design tokens](https://gestalt.pinterest.systems/foundations/design_tokens/overview#Font-size). See the [sizes variant](https://gestalt.pinterest.systems/web/text#Sizes) for more details.
     */
    size?: Size;
    /**
     * Determines the style of the list. See the [type variant](https://gestalt.pinterest.systems/web/list#Type) to learn more.
     */
    type?: ListType;
};
declare function InternalList({ label, labelDisplay, spacing, size, type, children, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace InternalList {
    var displayName: string;
}
export default InternalList;
