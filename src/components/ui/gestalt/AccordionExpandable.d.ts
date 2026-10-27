import { ReactElement, ReactNode } from 'react';
import icons from './icons/index';
export type BadgeType = {
    text: string;
    type?: 'info' | 'error' | 'warning' | 'success' | 'neutral' | 'recommendation' | 'darkWash' | 'lightWash';
};
type Props = {
    /**
     * Label used to communicate to screen readers which accordion will be collapsed when interacting with the title button. Should be something clear, like "Collapse Security Policies Accordion". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     *
     */
    accessibilityCollapseLabel?: string;
    /**
     * Label used to communicate to screen readers which accordion will be expanded when interacting with the title button. Should be something clear, like "Expand Security Policies Accordion". Be sure to localize the label. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     */
    accessibilityExpandLabel?: string;
    /**
     * Specify a border. See [Box's border options](https://gestalt.pinterest.systems/web/box#Borders)
     */
    borderStyle?: 'sm' | 'shadow' | 'none';
    /**
     * The 0-based index indicating the item that should currently be expanded. This must be updated via `onExpandedChange` to ensure the correct item is expanded. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     */
    expandedIndex?: number | null | undefined;
    /**
     * Unique id to identify this Accordion. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     */
    id: string;
    /**
     * Array of accordions displayed in a stack. Only one item can be expanded at a time. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     */
    items: ReadonlyArray<{
        badge?: BadgeType;
        children?: ReactNode;
        icon?: keyof typeof icons;
        iconAccessibilityLabel?: string;
        iconButton?: ReactElement;
        summary?: ReadonlyArray<string>;
        title: string;
        type?: 'error' | 'info';
    }>;
    /**
     * Callback executed whenever any accordion item is expanded or collapsed. It receives the index of the currently expanded accordion, or null if none are expanded. See [Expandable](https://gestalt.pinterest.systems/web/accordion#Expandable) variant to learn more.
     */
    onExpandedChange?: (arg1?: number | null | undefined) => void;
    /**
     * Size
     */
    size?: 'sm' | 'md' | 'lg';
};
/**
 * Use [Accordion.Expandable](https://gestalt.pinterest.systems/web/accordion) if your accordion requires expanding and collapsing content.
 */
declare function AccordionExpandable({ accessibilityExpandLabel, accessibilityCollapseLabel, borderStyle, expandedIndex, id, items, onExpandedChange, size, }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace AccordionExpandable {
    var displayName: string;
}
export default AccordionExpandable;
