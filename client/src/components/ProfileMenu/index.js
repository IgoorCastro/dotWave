// usado no NavBar
import React, { useState, useRef, useEffect } from 'react';
import * as C from './styles';
import { useNavigate } from 'react-router-dom';

import userDefaultPicture from '../../assets/user.svg';
import confIcon from '../../assets/userProfileIcons/conf.svg';
import editIcon from '../../assets/userProfileIcons/edit.svg';
import exitIcon from '../../assets/userProfileIcons/exit.svg';
import { useAuthContext } from '../../context/AuthContext';
import { useMainContext } from '../../context/DataContext';

const ProfileMenu = () => {
    const { user, logout } = useAuthContext();
    const { toggleIsLoginVisible, toggleIsCadastroVisible } = useMainContext();
    const [showUserMenu, setShowUserMenu] = useState(false);
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    const togglerMenu = () => {
        setShowUserMenu(!showUserMenu);
    }

    const handleClickOutside = (event) => {
        if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
            setShowUserMenu(false);
        }
    }

    useEffect(() => {
        // utilizando o listerner para identificar cliques fora do componente
        document.addEventListener('mousedown', handleClickOutside);

        // return utilizado para remover o event listener quando o componente é desmontado
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClickInside = (event) => {
        // 'stopPropagation' garante que o evento de clique não seja propagado para fora do UserDropMenuContainer
        event.stopPropagation();
    }

    const linkProfile = () => {
        const link = '/' + user[0].usu_nomeExb;
        navigate(link);
    }

    return (
            <C.UserMenuContainer onClick={togglerMenu} tabIndex="0" ref={userMenuRef}>
                <C.UserMenuImg src={user ? user[0].usu_image : userDefaultPicture} style={{ width: !user ? '60%' : 'auto' }} />
                {showUserMenu && (
                    user ? (
                        <C.UserDropMenuContainer onClick={handleClickInside}>
                            <C.UserDropMenuContent>
                                <C.UserDropMenuLine onClick={linkProfile}>
                                    <C.UserDropMenuIconContainer>
                                        <C.UserDropMenuIcon src={editIcon} />
                                    </C.UserDropMenuIconContainer>
                                    <C.UserDropMenuLabel>
                                        Perfil
                                    </C.UserDropMenuLabel>
                                </C.UserDropMenuLine>

                                <C.UserDropMenuLine onClick={() => alert("Configurar")}>
                                    <C.UserDropMenuIconContainer>
                                        <C.UserDropMenuIcon src={confIcon} />
                                    </C.UserDropMenuIconContainer>
                                    <C.UserDropMenuLabel>
                                        Configurações
                                    </C.UserDropMenuLabel>
                                </C.UserDropMenuLine>

                                <C.UserDropMenuLine onClick={logout}>
                                    <C.UserDropMenuIconContainer>
                                        <C.UserDropMenuIcon src={exitIcon} />
                                    </C.UserDropMenuIconContainer>
                                    <C.UserDropMenuLabel>
                                        Sair
                                    </C.UserDropMenuLabel>
                                </C.UserDropMenuLine>
                            </C.UserDropMenuContent>
                        </C.UserDropMenuContainer>
                    ) : (
                        <C.UserDropMenuContainer onClick={handleClickInside}>
                            <C.UserDropMenuContent>
                                <C.UserDropMenuLine onClick={toggleIsLoginVisible} >
                                    <C.UserDropMenuIconContainer>
                                        <C.UserDropMenuIcon src={exitIcon} poz />
                                    </C.UserDropMenuIconContainer>
                                    <C.UserDropMenuLabel>
                                        Login
                                    </C.UserDropMenuLabel>
                                </C.UserDropMenuLine>

                                <C.UserDropMenuLine onClick={toggleIsCadastroVisible} >
                                    <C.UserDropMenuIconContainer>
                                        <C.UserDropMenuIcon src={exitIcon} poz />
                                    </C.UserDropMenuIconContainer>
                                    <C.UserDropMenuLabel>
                                        Cadastro
                                    </C.UserDropMenuLabel>
                                </C.UserDropMenuLine>
                            </C.UserDropMenuContent>
                        </C.UserDropMenuContainer>
                    )
                )}
            </C.UserMenuContainer>
    )
}

export default ProfileMenu;
