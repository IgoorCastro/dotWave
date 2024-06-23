import React, { useEffect, useState } from 'react';
import * as C from './styles';
import { useLocation, useParams } from 'react-router-dom';
import Axios from 'axios';

import ProfileEdit from '../../components/ProfileEdit';
import SocialIcon from '../../components/SocialIcon';

import AnimateBackground from '../../components/AnimatedBackground2';
import CarouselFaixas from '../../components/CarouselTracksNew';
import ProfilePicture from '../../components/UserProfilePicture';
import NavBar from '../../components/NavBar';
import MusicPlayer from '../../components/MusicPlayer';
import UserNotFound from '../../components/404';

import InstaIcon from '../../assets/socialIcons/instagram.svg';
import TwitterIcon from '../../assets/socialIcons/twitter.svg';
import YoutubeIcon from '../../assets/socialIcons/youtube.svg';
import SpotifyIcon from '../../assets/socialIcons/spotify.svg';
import SoundcloudIcon from '../../assets/socialIcons/soundCloud.svg';
import editIcon from '../../assets/editIcon.svg';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

const UserProfile = () => {
    const { username } = useParams();
    const location = useLocation(); // useLocation para verificar se o pathname foi alterado
    const { isMusicPlayerVisible, isProfileEditVisible, toggleProfileEditVisible, userProfileUpdate } = useMainContext();
    const { setUser } = useAuthContext();
    const { user } = useAuthContext();
    const [musicList, setMusicList] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchUser, setSearchUser] = useState(null);
    let isOwnProfile = null;

    // Checar se o usuario conectado é o mesmo sendo pesquisado via url
    if (user) {
        const userExbName = user[0].usu_nomeExb.trim();
        const trimmedUsername = username.trim();
        isOwnProfile = userExbName === trimmedUsername;
    }

    // Metodo para verificar quais as midias disponiveis do usuario
    const checkSocialMidia = () => {
        // Lista de ícones válidos
        const validSocial = [];

        const socialIcons = [
            { midiaUrl: 'usu_instagram', icon: InstaIcon, bgColor: '#FF006E' },
            { midiaUrl: 'usu_x', icon: TwitterIcon, bgColor: '#0099FF' },
            { midiaUrl: 'usu_youtube', icon: YoutubeIcon, bgColor: '#FB5607' },
            { midiaUrl: 'usu_spotify', icon: SpotifyIcon, bgColor: '#FFBE0B' },
            { midiaUrl: 'usu_soundcloud', icon: SoundcloudIcon, bgColor: '#8338EC' }
        ];

        for (const { midiaUrl, icon, bgColor } of socialIcons) {
            if (user[0][midiaUrl] !== '' & user[0][midiaUrl] !== null) {
                console.log('midiaUrl: ', midiaUrl, ': ', user[0][midiaUrl]);
                validSocial.push(
                    <div>
                        <SocialIcon key={midiaUrl} src={icon} onClick={() => window.open('https://' + user[0][midiaUrl], '_blank')} borderColor={bgColor} alt='' />
                    </div>
                );
            }

        }
        return validSocial.length > 0 ? validSocial : null;
    }

    useEffect(() => {
        console.log('\n\n(TEST) --> user\n', user);
        checkSocialMidia();
        setMusicList(null);
        const fetchUserData = async () => {
            let searchId = null;
            try {
                const response = await Axios.get("http://localhost:3006/getUser", { // busca pelo usuario pesquisado
                    params: { username: username }
                });

                if (response.data) {
                    if (isOwnProfile) setUser(response.data);
                    setSearchUser(response.data[0]);
                    searchId = response.data[0].usu_id;
                }

                const listMusic = await Axios.get("http://localhost:3006/getMusicList", { // buscar por musica do usuario de searchUser
                    params: { user_id: searchId }
                });
                if (listMusic.data.length > 0) {
                    setMusicList(listMusic.data);
                } else {
                    setMusicList(null);
                }
            } catch (error) {
                console.log(`-> erro: ${error}`)
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, [location.pathname, username, isOwnProfile, userProfileUpdate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const togglerProfileEdit = () => {
        toggleProfileEditVisible();
    }

    return (
        <C.Container>
            {searchUser ? (
                <>
                    <AnimateBackground blur={false} />

                    <NavBar />

                    {isMusicPlayerVisible && (
                        <MusicPlayer props={musicList} />
                    )}

                    {isProfileEditVisible && (
                        <ProfileEdit user={isOwnProfile ? user : searchUser[0]} musicList={musicList} />
                    )}

                    <C.MainContainer>
                        <C.MainContent>
                            <C.UserProfileContainer>
                                <C.ProfileImageContent>
                                    <ProfilePicture props={Array.isArray(searchUser) ? searchUser[0].usu_image : searchUser.usu_image} />
                                </C.ProfileImageContent>
                                <C.UserProfileContent>
                                    <C.UserProfileContentName>
                                        <C.EditProfileContainer>
                                            <C.ExbName>{Array.isArray(searchUser) ? searchUser[0].usu_nomeExb : searchUser.usu_nomeExb}</C.ExbName>
                                            {isOwnProfile && (
                                                <C.EditProfileIcon src={editIcon} onClick={togglerProfileEdit} />
                                            )}
                                        </C.EditProfileContainer>
                                        <C.ConName>{Array.isArray(searchUser) ? searchUser[0].usu_nomeContato : searchUser.usu_nomeContato}</C.ConName>
                                    </C.UserProfileContentName>
                                    <C.SocialContainer>
                                        {checkSocialMidia()}
                                    </C.SocialContainer>
                                </C.UserProfileContent>

                                <C.UserAboutContent>
                                    <C.Label>About me</C.Label>
                                    <C.UserAboutSection>
                                        <C.Label>{Array.isArray(searchUser) ? searchUser[0].usu_sobre : searchUser.usu_sobre}</C.Label>
                                        <C.Label>{Array.isArray(searchUser) ? searchUser[0].usu_email : searchUser.usu_email}</C.Label>
                                    </C.UserAboutSection>
                                </C.UserAboutContent>
                            </C.UserProfileContainer>
                        </C.MainContent>
                    </C.MainContainer>

                    <C.CarouselContainer>
                        {musicList && (
                            <CarouselFaixas items={musicList} />
                        )}
                    </C.CarouselContainer>
                </>
            ) : (
                <UserNotFound />
            )}
        </C.Container>
    );
};

export default UserProfile;
