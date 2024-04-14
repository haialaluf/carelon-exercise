import React, { useEffect, useState } from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components'
import { parse } from './Parser';
import { CopyBlock } from "react-code-blocks";
import { useDebounce } from 'use-debounce';
import { useGPTModel } from './chat';
import { Discuss } from 'react-loader-spinner';

const apiKey = prompt('Please enter your OpenAI API key');

export default function App() {
  const [graph, setGraph] = useState({});
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [value] = useDebounce(text, 1000);
  const textHandler = useGPTModel(apiKey as string);

  const { nodes, edges } = graph as any;

  useEffect(() => {
    if (textHandler && value) {
      setIsLoading(true);
      textHandler(value).then((graph: any) => {
        const paresedGraph = parse(graph.nodes, graph.edges);
        setGraph(paresedGraph);
        setIsLoading(false);
        setText('');
      });
    }
  }, [value]);

  return (
    <Container>
      <InputContainer>
        <input type="text" value={text} onChange={(e) => {
          setText(e.target.value);
        }}/>
      </InputContainer>
      <ChartContainer>
        <LoaderContainer>
          <Discuss
            visible={isLoading}
            { ...loderProps }
          />
        </LoaderContainer>
        <ReactFlow nodes={nodes} edges={edges}/>
      </ChartContainer>
      <SnippetContainer>
        <CopyBlock
          text={JSON.stringify(nodes, null, 2)}
          language={'json'}
          showLineNumbers
        />
        <CopyBlock
          text={JSON.stringify(edges, null, 2)}
          language={'json'}
          showLineNumbers
        />
      </SnippetContainer>

    </Container>
  );
}

const Container = styled.div`
  width: calc(100vw - 64px);;
  padding: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChartContainer = styled.div`
  width: calc(100vw - 128px);
  height: 512px;
  border-color: #000000;
  display: flex;
  position: relative;
`;

const InputContainer = styled.div`
  border-color: #000000;
  width: calc(100vw - 128px);
  display: flex;
  margin-bottom: 32px;
  padding: 8px;
  input {
    width: 100%;
    padding: 8px;
  }
`;

const SnippetContainer = styled.div`
  width: calc(100vw - 64px);
  justify-content: space-evenly;
  display: flex;
`;

const LoaderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: treanslate(-50%, -50%);
`;

const loderProps = {
  height: "80",
  width: "80",
  backgroundColor: "#F4442E"
}