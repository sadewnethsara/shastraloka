import { ComponentProps } from 'react';
import Box from './Box';
import Icon from './Icon';
declare const MESSAGING_ATTRIBUTES: {
    [status: string]: {
        icon?: ComponentProps<typeof Icon>['icon'];
        iconColor?: ComponentProps<typeof Icon>['color'];
        color?: string;
        backgroundColor?: ComponentProps<typeof Box>['color'];
    };
};
export default MESSAGING_ATTRIBUTES;
