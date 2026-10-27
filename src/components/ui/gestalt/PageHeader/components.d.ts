import { ComponentProps, ReactElement, ReactNode } from 'react';
import Badge, { TypeOptions } from '../Badge';
import { ActionType } from '../PageHeader';
export declare function PageHeaderTitle({ marginTop, title, }: {
    marginTop: number | null | undefined;
    title: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderThumbnail({ thumbnail }: {
    thumbnail: ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderBadge({ badgeText, badgeTooltip, type, }: {
    badgeText: string;
    badgeTooltip?: ComponentProps<typeof Badge>['tooltip'];
    type?: TypeOptions;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderHelperIconButton({ accessibilityLabel, accessibilityControls, accessibilityExpanded, onClick, }: {
    accessibilityLabel: string;
    accessibilityControls: string;
    accessibilityExpanded: boolean;
    onClick: (arg1: {
        event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>;
    }) => void;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderSubtext({ subtext, helperLink, }: {
    subtext: string;
    helperLink?: {
        text: string;
        accessibilityLabel: string;
        href: string;
        onClick?: (arg1: {
            event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
            dangerouslyDisableOnNavigation: () => void;
        }) => void;
    };
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderActionBlock({ primaryAction, secondaryAction, dropdownAccessibilityLabel, }: {
    primaryAction?: {
        component: ActionType;
        dropdownItems: ReadonlyArray<ReactElement>;
    };
    secondaryAction?: {
        component: ActionType;
        dropdownItems: ReadonlyArray<ReactElement>;
    };
    dropdownAccessibilityLabel?: string;
}): import("react/jsx-runtime").JSX.Element;
export declare function PageHeaderItemsBlock({ items }: {
    items: ReadonlyArray<ReactNode>;
}): import("react/jsx-runtime").JSX.Element;
