import React from 'react';
import * as C from './styles';

import EditContainer from '../EditContainer';

const SocialIcon = ({key, src = null, borderColor, href, imgVisible = true, iconVisible, editContainer = false, onClick}) => {
  
  const handleOnClick = () => {
    onClick();
  };
  
  return (
    <C.SocialIconContainer key={key} borderColor={borderColor} onClick={handleOnClick}>
        {editContainer && (
            <EditContainer borderRadius='.6rem' iconVisible={iconVisible} />
        )}
        {imgVisible && (
          <img src={src} alt='' />
        )}
    </C.SocialIconContainer>
  )
}

export default SocialIcon