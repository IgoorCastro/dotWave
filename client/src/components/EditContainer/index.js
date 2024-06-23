import React from 'react';
import * as C from './styles';

import editIcon from '../../assets/editContainer.svg'

const EditContainer = ({ borderRadius, iconVisible = true }) => {
  return (
    <C.EditContainer borderRadius={borderRadius} >
        {iconVisible && (
          <img src={editIcon} alt='Edit Icon' />
        )}
    </C.EditContainer>
  )
}

export default EditContainer;