import dagre from 'dagre';
import { Node, Edge, Position } from "reactflow";
import { CarelonNode, CarelonEdge } from "./models";

const nodeWidth = 172;
const nodeHeight = 36;

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const getLayoutedElements = (nodes: Node[], edges: Edge[], direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node: Node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? Position.Left : Position.Top;
    node.sourcePosition = isHorizontal ? Position.Right : Position.Left;

    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};


export const parse = (carelonNodes: CarelonNode[], carelonEdges: CarelonEdge[]) : {nodes: Node[], edges: Edge[]} => {

    const edges = carelonEdges.map((edge) => ({
        id: edge.v + '-' + edge.w,
        source: edge.v,
        target: edge.w
    }));

    const nodes = carelonNodes.map((node) => ({
        id: node.v,
        data: {
            ...node.value,
        },
        position: {x: 0, y: 0}
    }));

    return getLayoutedElements(nodes, edges);
}
