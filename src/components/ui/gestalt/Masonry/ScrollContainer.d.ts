/**
 * ScrollContainer is a pass-through component that simply sets up an onScroll
 * handler on the given scrollContainer element (or the element that is
 * returned as result of calling the scrollContainer method). This allows for
 * the event listener subscription of the scrollContainer to be managed inside
 * the React lifecycle without adding bloat to Masonry or other onScroll
 * subscribers.
 *
 * Note that this Component renders its children without creating any
 * additional content. Also note that, while the component is built to manage
 * onScroll inside of the React lifecycle, it doesn't change onScroll events
 * or the API at all, so it could easily be adapted to other event types.
 */
import { Component, ReactNode } from 'react';
type Props = {
    children?: ReactNode;
    onScroll: (event: Event) => void;
    scrollContainer: HTMLElement | null | undefined | (() => HTMLElement | Window | null | undefined);
};
export default class ScrollContainer extends Component<Props> {
    scrollContainer: HTMLElement | Window | null | undefined;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    getScrollContainerRef: () => HTMLElement | Window | null | undefined;
    handleScroll: (event: Event) => void;
    updateScrollContainer(scrollContainer: HTMLElement | Window): void;
    render(): ReactNode;
}
export {};
