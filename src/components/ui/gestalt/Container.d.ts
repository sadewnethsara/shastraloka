import { ReactNode } from 'react';
type Props = {
    /**
     *
     */
    children?: ReactNode;
};
/**
 * [Containers](https://gestalt.pinterest.systems/web/container ) are useful in responsively laying out content on different screens.
 *
 * ![Container light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/Container.spec.ts-snapshots/Container-chromium-darwin.png)
 *
 */
declare function Container({ children }: Props): import("react/jsx-runtime").JSX.Element;
declare namespace Container {
    var displayName: string;
}
export default Container;
