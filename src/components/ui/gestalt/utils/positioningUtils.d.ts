declare const getContainerNode: ({ scrollBoundaryContainerRef, initialPositionRef, }: {
    scrollBoundaryContainerRef: HTMLElement | null | undefined;
    initialPositionRef: HTMLElement | null | undefined;
}) => HTMLElement | null | undefined;
export default getContainerNode;
