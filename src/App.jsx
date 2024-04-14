import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import { edges, nodes } from  './assets/mock-workflow';

export default function App() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <ReactFlow nodes={nodes} edges={edges} />
    </div>
  );
}
