import React, { ReactElement } from 'react';
type Props = {
    /**
     * Label for screen readers to announce SearchGuideLink. See the [Accessibility guidelines](https://gestalt.pinterest.systems/web/searchguide#ARIA-attributes) for details on proper usage.
     */
    accessibilityLabel?: string;
    /**
     * The background color of SearchGuideLink.
     * See the [color variant](https://gestalt.pinterest.systems/web/searchguide#Colors) for implementation guidance.
     */
    color?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | Array<string>;
    /**
     * Available for testing purposes, if needed. Consider [better queries](https://testing-library.com/docs/queries/about/#priority) before using this prop.
     */
    dataTestId?: string;
    /**
     * Text to render inside the SearchGuideLink to convey the function and purpose of the SearchGuideLink.
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
    /**
     * Callback invoked when the user clicks (press and release) on ButtonLink with the mouse or keyboard.
     * See [GlobalEventsHandlerProvider](/web/utilities/globaleventshandlerprovider#Link-handlers) to learn more about link navigation.
     */
    onClick?: (arg1: {
        event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
        dangerouslyDisableOnNavigation: () => void;
    }) => void;
    /**
     * Use "-1" to remove ButtonLink from keyboard navigation. See the [Accessibility guidelines](/foundations/accessibility) to learn more.
     */
    tabIndex?: -1 | 0;
    /**
     * Specifies a link URL.
     */
    href: string;
    /**
     * Provides hints for SEO. See the [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#rel) to learn more.
     */
    rel?: 'none' | 'nofollow';
    /**
       * Indicates the browsing context where an href will be opened:
    - 'null' opens the anchor in the same window.
    - 'blank' opens the anchor in a new window.
    - 'self' opens an anchor in the same frame.
       */
    target?: null | 'self' | 'blank';
};
/**
 * [SearchGuideLink](https://gestalt.pinterest.systems/web/searchguidelink) appends and refines a search query. They appear under [SearchField](/web/searchfield) after user submits a search input.
 *
 * ![SearchGuideLink light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuideLink.spec.ts-snapshots/SearchGuideLink-chromium-darwin.png)
 * ![SearchGuideLink dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/SearchGuideLink-dark.spec.ts-snapshots/SearchGuideLink-dark-chromium-darwin.png)
 *
 */
declare const SearchGuideLinkWithForwardRef: React.ForwardRefExoticComponent<Props & React.RefAttributes<HTMLAnchorElement>>;
export default SearchGuideLinkWithForwardRef;
