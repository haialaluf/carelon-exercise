export interface CarelonWorkflow {
    nodes: CarelonNode[];
    edges: CarelonEdge[];
}

export interface CarelonNode {
    v: string;
    value: AddWorkflowNode | ActionWorkflowNode;
}

export interface CarelonEdge {
    v: string;
    w: string;
    value: {
        conditionId?: 0 | 1;
    }
}

export interface AddWorkflowNode {
    isPlaceholder: boolean;
    label: string;
}

export interface ActionWorkflowNode {
    label: string;
    type: NodeTypes;
    data: SmsData | IfElseData | JUMPData | TriggerData;
}

export interface SmsData {
    message: string;
    widgets: any[];
}

export interface TriggerData {
    type: NodeTypes;
}
export interface IfElseData extends TriggerData {
    message: string;
    operator: Operators,
    expectedValue: 'yes' | 'no',
}

export interface JUMPData {
    nodeId: string;
};

export type NodeTypes = 'sms' | 'if-else' | 'trigger' | 'jump' | 'add' | 'message';

export type Operators = 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'greater-than-or-equal';

export const MODEL_AS_STRING = `
export interface CarelonWorkflow {
    nodes: CarelonNode[];
    edges: CarelonEdge[];
}

export interface CarelonNode {
    v: string;
    value: AddWorkflowNode | ActionWorkflowNode;
}

export interface CarelonEdge {
    v: string;
    w: string;
    value: {
        conditionId?: 0 | 1;
    }
}

export interface AddWorkflowNode {
    isPlaceholder: boolean;
    label: string;
}

export interface ActionWorkflowNode {
    label: string;
    type: NodeTypes;
    data: SmsData | IfElseData | JUMPData | TriggerData;
}

export interface SmsData {
    message: string;
    widgets: any[];
}

export interface TriggerData {
    type: NodeTypes;
}
export interface IfElseData extends TriggerData {
    message: string;
    operator: Operators,
    expectedValue: 'yes' | 'no',
}

export interface JUMPData {
    nodeId: string;
};

export type NodeTypes = 'sms' | 'if-else' | 'trigger' | 'jump' | 'add' | 'message';

export type Operators = 'equals' | 'not-equals' | 'greater-than' | 'less-than' | 'greater-than-or-equal';
`