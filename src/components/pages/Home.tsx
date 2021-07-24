import Box from '../uis/Box';
import React, {useState} from 'react';
import styled from '@emotion/native';
import {LayoutRectangle} from 'react-native';

const Container = styled.View`
  flex: 1;
`;

function Home(): React.ReactElement {
  const [container, setContainer] = useState<LayoutRectangle | null>(null);

  return (
    <Container onLayout={({nativeEvent: {layout}}) => setContainer(layout)}>
      {container && <Box {...container} />}
    </Container>
  );
}

export default Home;
