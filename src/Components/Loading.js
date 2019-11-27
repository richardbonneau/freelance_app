import React from 'react';
import styled,{keyframes} from 'styled-components';

const motion = props => keyframes`
0%{
  transform: rotate(0deg);
}
100%{
  transform:rotate(360deg);
}
`

const DualRingSpinner = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
  :after {
    content: ' ';
    display: block;
    width: 46px;
    height: 46px;
    margin: 1px;
    border-radius: 50%;
    border: 5px solid ${p => p.color};
    border-color: ${p => p.color} transparent ${p => p.color} transparent;
    animation: ${p => motion(p)} 1.2s linear infinite;
  }
`

function Loading() {
  return (
    <DualRingSpinner color="purple" />
  );
}

export default Loading;
