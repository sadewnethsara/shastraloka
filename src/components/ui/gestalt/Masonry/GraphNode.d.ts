import { NodeData } from './types';
type Edge<T> = {
    score: number;
    node: GraphNodeInterface<T>;
};
export interface GraphNodeInterface<T> {
    data: NodeData<T>;
    edges: ReadonlyArray<Edge<T>>;
    addEdge(node: GraphNodeInterface<T>, score: number): void;
    removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null;
    getEdges(): ReadonlyArray<Edge<T>>;
    isEdge(node: GraphNodeInterface<T>): boolean;
}
export default class GraphNode<T> implements GraphNodeInterface<T> {
    data: NodeData<T>;
    edges: ReadonlyArray<Edge<T>>;
    constructor(data: NodeData<T>);
    addEdge(node: GraphNodeInterface<T>, score: number): void;
    removeEdge(node: GraphNodeInterface<T>): GraphNodeInterface<T> | null;
    getEdges(): ReadonlyArray<Edge<T>>;
    isEdge(node: GraphNodeInterface<T>): boolean;
}
export {};
