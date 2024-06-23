import React from 'react';
import * as C from './styles'
import logo from '../../assets/logoWave01.png';

const AnimateBackground = ({ blur = false }) => {
    return (
        <C.AnimateContainer>
            <C.AnimateContent>
                <C.AnimateBackground blur={blur} >
                    <C.AnimateImg src={logo} />
                </C.AnimateBackground>
            </C.AnimateContent>
        </C.AnimateContainer>
    )
}

export default AnimateBackground;
