import GraphNode, { GraphNodeInterface } from './GraphNode';
import { NodeData } from './types';
type NodesList<T> = Map<NodeData<T>, GraphNode<T>>;
interface GraphInterface<T> {
    nodes: NodesList<T>;
    addEdge(source: NodeData<T>, destination: NodeData<T>, edgeScore: number): ReadonlyArray<GraphNodeInterface<T>>;
    addNode(data: NodeData<T>): GraphNodeInterface<T>;
    removeNode(data: NodeData<T>): boolean | undefined;
    removeEdge(source: NodeData<T>, destination: NodeData<T>): ReadonlyArray<GraphNodeInterface<T> | null | undefined>;
}
export default class Graph<T> implements GraphInterface<T> {
    constructor();
    nodes: NodesList<T>;
    addEdge(source: NodeData<T>, destination: NodeData<T>, edgeScore: number): ReadonlyArray<GraphNodeInterface<T>>;
    addNode(data: NodeData<T>): GraphNodeInterface<T>;
    removeNode(data: NodeData<T>): boolean | undefined;
    removeEdge(source: NodeData<T>, destination: NodeData<T>): ReadonlyArray<GraphNodeInterface<T> | null | undefined>;
    findLowestScore(startNode: NodeData<T>): {
        lowestScore: number | null;
        lowestScoreNode: NodeData<T>;
    };
}
export {};
