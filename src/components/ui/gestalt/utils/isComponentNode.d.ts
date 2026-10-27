import { ReactElement } from 'react';
declare const isComponentNode: ({ text, components, }: {
    text: string | ReactElement;
    components: ReadonlyArray<string>;
}) => boolean;
export default isComponentNode;
