type AvatarFoundationProps = {
    color?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
    children?: string | number;
    isCollaboratorCount?: boolean;
    isHovered?: boolean;
    isPressed?: boolean;
    fontSize?: string;
    outline?: boolean;
    textAnchor?: 'start' | 'middle' | 'end';
    title?: string;
    translate?: 'translateX10';
    content?: 'text' | 'icon';
};
export default function AvatarFoundation({ color, children, fontSize, isCollaboratorCount, isHovered, isPressed, outline, textAnchor, title, translate, content, }: AvatarFoundationProps): import("react/jsx-runtime").JSX.Element;
export {};
