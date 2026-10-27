import React, { ReactElement } from 'react';
type Props = {
    /**
     * Specifies the id of an associated element (or elements) whose contents or visibility are controlled by SearchGuide so that screen reader users can identify the relationship between elements.
     */
    accessibilityControls?: string;
    /**
     * Indicates that SearchGuide hides or exposes collapsible components and exposes whether they are currently expanded or collapsed.
     */
    accessibilityExpanded?: boolean;
    /**
     * Indicates that a component controls the appearance of interactive popup elements, such as menu or dialog. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
     */
    accessibilityHaspopup?: boolean;
    /**
     * Label for screen readers to announce SearchGuide. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
     */
    accessibilityLabel?: string;
    /**
     * The background color of SearchGuide.
     * See the [color variant](https://gestalt.pinterest.systems/web/searchguide#Colors) for implementation guidance.
     */
    color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | ReadonlyArray<string>;
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Indicates that the SearchGuide is expandable. See the [expandable variant](https://gestalt.pinterest.systems/web/searchguide#Expandable) to learn more.
     */
    expandable?: boolean;
    /**
     * Callback invoked when the user clicks (press and release) on SearchGuide with the mouse or keyboard.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
    /**
     * Toggles between binary states: on/off, selected/unselected, open/closed. See the [selected](#Selected-state) variant to learn more. See the [state variant](https://gestalt.pinterest.systems/web/searchguide#State) for details on proper usage.
     */
    selected?: boolean;
    /**
     * Text to render inside the SearchGuide to convey the function and purpose of the SearchGuide.
     *
     * It can be empty, but is still required as a fallback to accessibilityLabel.
     */
    text: string;
    /**
     * The thumbnail prop is used to display an image or icon to the left of the text. See the [thumbnail variant](https://gestalt.pinterest.systems/web/searchguide#Thumbnail) to learn more.
     */
    thumbnail?: {
        avatar: ReactElement;
    } | {
        avatarGroup: ReactElement;
    } | {
        image: ReactElement;
    } | {
        icon: ReactElement;
    };
};
/**
 * [SearchGuide](https://gestalt.pinterest.systems/web/searchguide) appends and refines a search query. They appear under [SearchField](/web/searchfield) after user submits a search input.
 *
 * ![SearchGuide light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuide.spec.ts-snapshots/SearchGuide-chromium-darwin.png)
 * ![SearchGuide dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuide-dark.spec.ts-snapshots/SearchGuide-dark-chromium-darwin.png)
 *
 */
declare const SearchGuideWithForwardRef: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLButtonElement>>;
export default SearchGuideWithForwardRef;
