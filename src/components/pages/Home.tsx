import Box from '../uis/Box';
import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  flex: 1;
  align-self: stretch;

  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Home(): React.ReactElement {
  return (
    <Container>
      <Box />
    </Container>
  );
}

export default Home;
