import React from 'react';
import styled from '@emotion/native';

const Container = styled.View`
  width: 150px;
  height: 150px;
  background-color: red;
`;

function Box(): React.ReactElement {
  return <Container />;
}

export default Box;
