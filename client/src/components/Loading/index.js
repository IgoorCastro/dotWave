import React from 'react';
import * as C from './styles';

const Loading = () => {
  return (
    <C.Container>
      <C.Content>
        <C.LoadingContainer>
          <C.Loader />
        </C.LoadingContainer>
      </C.Content>
    </C.Container>
  )
}

export default Loading