import { ReactElement } from 'react';
type StatusType = 'unstarted' | 'queued' | 'inProgress' | 'halted' | 'locked' | 'ok' | 'problem' | 'canceled' | 'warning';
type Props = {
    /**
     * If not using `title`, provide an accessibility label to give the user context about the icon. Be sure to [localize](https://gestalt.pinterest.systems/web/status#Localization) the label.
     */
    accessibilityLabel?: string;
    /**
     * Additional contextual information around the status. Only for use with `title`. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
     */
    subtext?: string;
    /**
     * A label to reinforce the meaning of the status icon. See [localization](https://gestalt.pinterest.systems/web/status#Localization) to learn more.
     */
    title?: string | ReactElement;
    /**
     * The type of status to display.
     */
    type: StatusType;
};
/**
 * [Status](https://gestalt.pinterest.systems/web/status) is a graphic indicator of an element’s state.
 *
 * ![Status light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status.spec.ts-snapshots/Status-chromium-darwin.png)
 * ![Status dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Status-dark.spec.ts-snapshots/Status-dark-chromium-darwin.png)
 *
 */
declare function Status({ accessibilityLabel, subtext, title, type }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Status {
    var displayName: string;
}
export default Status;
