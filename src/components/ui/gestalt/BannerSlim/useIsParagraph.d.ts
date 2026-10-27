declare const useIsParagraph: ({ referenceRef, targetRef, }: {
    referenceRef: React.MutableRefObject<HTMLDivElement | null>;
    targetRef: React.MutableRefObject<HTMLDivElement | null>;
}) => boolean;
export default useIsParagraph;
