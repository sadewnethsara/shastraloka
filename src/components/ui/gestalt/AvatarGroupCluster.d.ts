type Props = {
    /**
     * AvatarGroupCluster has different configurations for 2, 3, 4, and above 4 collaborators.
     */
    collaborators: ReadonlyArray<{
        color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
        name: string;
        src?: string;
    }>;
    /**
     * AvaraGroupCluster is available in 2 fixed sizes. See the [sizes variant](https://gestalt.pinterest.systems/web/avatargroupcluster#Sizes) to learn more.
     */
    size?: 'sm' | 'md';
};
/**
 * [AvatarGroupCluster](https://gestalt.pinterest.systems/web/avatargroupcluster) is used to both display a group of user avatars.
 *
 * ![AvatarGroupCluster light mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroupCluster.spec.ts-snapshots/AvatarGroupCluster-chromium-darwin.png)
 * ![AvatarGroupCluster dark mode](https://raw.githubusercontent.com/pinterest/gestalt/master/playwright/visual-test/AvatarGroupCluster-dark.spec.ts-snapshots/AvatarGroupCluster-dark-chromium-darwin.png)
 */
declare const AvatarGroupClusterWithForwardRef: import("react").ForwardRefExoticComponent<Props & import("react").RefAttributes<HTMLDivElement>>;
export default AvatarGroupClusterWithForwardRef;
