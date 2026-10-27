import { ComponentProps, ReactElement } from 'react';
import { IconColor } from '../Icon';
import Text from '../Text';
export declare function Message({ text, textElement, helperLink, textColor, type, }: {
    text: string | null | undefined | ReactElement;
    textElement: string | null | undefined | ReactElement;
    textColor: ComponentProps<typeof Text>['color'];
    helperLink?: {
        text: string;
        accessibilityLabel: string;
        href: string;
        onClick?: (arg1: {
            event: React.MouseEvent<HTMLAnchorElement> | React.KeyboardEvent<HTMLAnchorElement>;
            dangerouslyDisableOnNavigation: () => void;
        }) => void;
    };
    type?: 'default' | 'success' | 'error' | 'progress';
}): import("react/jsx-runtime").JSX.Element;
export declare function ImageThumbnail({ thumbnail }: {
    thumbnail: ReactElement;
}): import("react/jsx-runtime").JSX.Element;
export declare function IconThumbnail({ thumbnail, overrideColor, }: {
    thumbnail: ReactElement;
    overrideColor?: IconColor;
}): import("react/jsx-runtime").JSX.Element;
export declare function AvatarThumbnail({ thumbnail }: {
    thumbnail: ReactElement;
}): import("react/jsx-runtime").JSX.Element;
export declare function TypeThumbnail({ type }: {
    type: 'default' | 'success' | 'error' | 'progress';
}): import("react/jsx-runtime").JSX.Element;
