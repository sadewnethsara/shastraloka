import { ReactNode } from 'react';
import TableOfContentsItem from './TableOfContentsItem';
type Props = {
    /**
     * String that clients such as VoiceOver will read to describe the element. See [accessibility](https://gestalt.pinterest.systems/web/tableofcontents#Accessibility) section to learn more.
     */
    accessibilityLabel?: string;
    /**
     * Title for the TableOfContents. See the [title variant](https://gestalt.pinterest.systems/web/tableofcontents#With-title) to learn more.
     */
    title?: string;
    /**
     * Must be instances TableofContents.Item
     */
    children: ReactNode;
};
/**
 * [TableOfContents](https://gestalt.pinterest.systems/web/tableofcontents) component is used to navigate to anchors on a page. It also serves as an outline of a page’s content. TableOfContents is placed on the right side of the page, close to the main content block.

 * ![TableOfContents light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents.spec.ts-snapshots/TableOfContents-chromium-darwin.png)
 * ![TableOfContents dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/TableOfContents-dark.spec.ts-snapshots/TableOfContents-dark-chromium-darwin.png)
 */
declare function TableOfContents({ accessibilityLabel, title, children }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace TableOfContents {
    var Item: typeof TableOfContentsItem;
    var displayName: string;
}
export default TableOfContents;
