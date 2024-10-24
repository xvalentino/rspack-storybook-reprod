import styled from 'styled-components';
import React from 'react';
import NxWelcome from './nx-welcome';

const StyledApp = styled.div`
  // Your style here
`;

export function App() {
  return (
    <StyledApp>
      <NxWelcome title="rspack-storybook-reprod" />
    </StyledApp>
  );
}

export default App;
