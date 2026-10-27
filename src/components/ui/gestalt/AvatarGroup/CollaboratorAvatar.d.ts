import { BaseStackType } from './constants';
type Props = BaseStackType & {
    color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    index: number;
    name: string;
    isHovered: boolean;
    isPressed: boolean;
    src: string;
};
export default function AvatarGroupCollaboratorAvatar({ color, isHovered, index, name, pileCount, isPressed, size, src, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
