import React, { useEffect, useState } from 'react';
import * as C from './styles';

import AnimateBackground from '../../components/AnimatedBackground2';
import NavBar from '../../components/NavBar';


const UserProfile = () => {
    return (
        <C.Container>
            <AnimateBackground blur={false} />
            <NavBar />

            <label style={{ marginLeft: '10%', marginTop: '10%'}}>404</label>
            <label style={{ marginLeft: '10%'}}>Usuario não encontrado</label>
            
        </C.Container>
    )
}

export default UserProfile;
