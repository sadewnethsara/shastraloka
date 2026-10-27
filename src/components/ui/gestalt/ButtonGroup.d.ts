import { ReactNode } from 'react';
type Props = {
    /**
     * One or more Buttons and/or IconButtons.
     */
    children?: ReactNode;
};
/**
 * [ButtonGroup](https://gestalt.pinterest.systems/web/buttongroup) is used to display a series of buttons.
 *
 * ![ButtonGroup light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup.spec.ts-snapshots/ButtonGroup-chromium-darwin.png)
 * ![ButtonGroup dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/ButtonGroup-dark.spec.ts-snapshots/ButtonGroup-dark-chromium-darwin.png)
 *
 */
declare function ButtonGroup({ children }: Props): import("react/jsx-runtime").JSX.Element | null;
declare namespace ButtonGroup {
    var displayName: string;
}
export default ButtonGroup;
