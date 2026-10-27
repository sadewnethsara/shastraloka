import { BaseStackType } from './constants';
type Props = BaseStackType & {
    showAddCollaboratorsButton?: boolean;
    count: number;
    isHovered?: boolean;
    isPressed?: boolean;
    outline?: boolean;
};
export default function AvatarGroupCollaboratorsCount({ showAddCollaboratorsButton, pileCount, hovered, isHovered, isPressed, count, size, outline, }: Props): import("react/jsx-runtime").JSX.Element;
export {};
