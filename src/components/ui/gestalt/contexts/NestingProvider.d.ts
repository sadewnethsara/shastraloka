import { ReactNode } from 'react';
type NestingContextType = {
    nestedLevel: number;
};
type Props = {
    componentName: 'SideNavigation' | 'List' | 'TableOfContents';
    maxNestedLevels: number;
    children: ReactNode;
};
declare function NestingProvider({ componentName, children, maxNestedLevels }: Props): import("react/jsx-runtime").JSX.Element;
declare function useNesting(): NestingContextType;
export { NestingProvider, useNesting };
