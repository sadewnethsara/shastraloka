import { Component, ReactNode } from 'react';
type Props = {
    children: ReactNode;
};
export default class NoScrollBehavior extends Component<Props> {
    prevOverflow: string | null;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): ReactNode;
}
export {};
