import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as C from './styles';

import LogoImg from '../../assets/waveTextWhite.svg';
import searchIcon from '../../assets/lupa.svg';
import uploadIcon from '../../assets/uploadIcon.svg';

import ProfileMenu from '../../components/ProfileMenu';
import AddMusic from '../AddMusic';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

const NavBar = () => {
    const [searchInput, setSearchInput] = useState();
    const [showMagnifer, setShowMagnifer] = useState(true);
    const inputRef = useRef(null);
    const { isAddMusicVisible, toggleAddMusicVisible } = useMainContext();
    const { user } = useAuthContext();

    const togglerMagnifer = () => {
        if (!searchInput)
            setShowMagnifer(!showMagnifer);
    }

    // alterar conteudo da state
    const handleChangeSearch = (event) => {
        // console.log(searchInput);
        setSearchInput(event.target.value);
    }

    const handleAddMusic = () => {
        console.log('isAddMusicVisible: ', isAddMusicVisible);
        toggleAddMusicVisible();
        console.log('~~ isAddMusicVisible: ', isAddMusicVisible);
    }

    return (
        <C.HeaderContainer>

        {isAddMusicVisible && (
            <AddMusic />
        )}
            
            <C.HeaderContent>
                <C.HeaderLogoContent>
                    <Link to="/" style={{ height: '65%' }} >
                        <C.HeaderLogo src={LogoImg} />
                    </Link>
                </C.HeaderLogoContent>

                <C.HeaderSearchContent  >
                    <C.SearchInput onChange={handleChangeSearch} ref={inputRef} placeholder='' onClick={togglerMagnifer} onBlur={togglerMagnifer} />
                </C.HeaderSearchContent>

                <C.UserMenuContainer>
                    {user && (
                        <img src={uploadIcon} alt='Upload icon' onClick={handleAddMusic} />
                    )}
                    <ProfileMenu />
                </C.UserMenuContainer>
            </C.HeaderContent>
        </C.HeaderContainer>
    )
}

export default NavBar
