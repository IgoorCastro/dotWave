import React, { useState } from 'react';
import * as C from './styles';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SocialIcon from '../SocialIcon';
import EditMusic from '../EditMusic';
import ConfirmDialog from '../ConfirmDialog';

import instaIcon from '../../assets/socialIcons/instagram.svg';
import twitterIcon from '../../assets/socialIcons/twitter.svg';
import youtubeIcon from '../../assets/socialIcons/youtube.svg';
import spotifyIcon from '../../assets/socialIcons/spotify.svg';
import soundcloudIcon from '../../assets/socialIcons/soundCloud.svg';
import ConfirmIcon from '../../assets/confirmIcon.svg';
import closeIcon from '../../assets/profileEditIcons/closeIcon.svg';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';
import Button from '../Button';
import Loading from '../Loading';

const ProfileEdit = () => {
    
    console.log('\n\nEditMusic');
    const { user, setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    console.log('>> user\n', user);
    const navigate = useNavigate();
    const { toggleProfileEditVisible, isConfirmDialogVisible, toggleConfirmDialogVisible, toggleUserProfileUpdate } = useMainContext();
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isMidiaInput, setIsMidiaInput] = useState(false);
    const [labelErro, setLabelErro] = useState(null);
    const [userImage, setUserImage] = useState(user[0].usu_image);
    const [userMidia, setUserMidia] = useState({
        instagram: user[0].usu_instagram ? user[0].usu_instagram : '',
        x: user[0].usu_x ? user[0].usu_x : '',
        youtube: user[0].usu_youtube ? user[0].usu_youtube : '',
        spotify: user[0].usu_spotify ? user[0].usu_spotify : '',
        soundcloud: user[0].usu_soundcloud ? user[0].usu_soundcloud : ''
    });
    const [userData, setUserData] = useState({
        username: user[0].usu_nomeExb,
        imagem: '',
        about: user[0].usu_sobre
    });

    const toggleShowMidiaInput = () => {
        setIsMidiaInput(!isMidiaInput);
        toggleUserProfileUpdate();
    }

    const toggleShowProfileEdit = () => {
        toggleProfileEditVisible();
        toggleUserProfileUpdate();
    }

    const handleChangeMidiaValue = (event) => {
        const { name, value } = event.target;

        setUserMidia(prevValues => ({
            ...prevValues,
            [name]: value
        }));

        console.log('\n\n--userMidia\n', userMidia);
    }

    const handleChangeDataValue = (event) => {
        const { name, value } = event.target;

        setUserData(prevValues => ({
            ...prevValues,
            [name]: value
        }));

        setLabelErro(null);
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        console.log('\n\n>>>>>>>> FILE\n\n', file);
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setLabelErro('O arquivo selecionado não é uma imagem válida.');
            return;
        }

        const validImageTypes = ['image/jpeg', 'image/png'];
        if (!validImageTypes.includes(file.type)) {
            setLabelErro('Formatos aceitos: jpeg ou png');
            return;
        }

        const img = new Image();
        img.onload = () => {
            const { naturalWidth: width, naturalHeight: height } = img;

            if (width === height) {
                setUserImage(URL.createObjectURL(file)); // arquivo para exibição
                setLabelErro(null);

                setUserData(prevValues => ({
                    ...prevValues,
                    imagem: file,
                }));
            } else {
                setLabelErro('A imagem deve ser quadrada');
            }
        };
        img.src = URL.createObjectURL(file);
        console.log('\n\n--userData\n', userData);
    }

    const handleConfirmEditMidia = async () => {
        try {
            const editResult = Axios.put("http://localhost:3006/editMidia", {
                midiaForm: userMidia,
                usu_id: user[0].usu_id
            });

            alert('Edição concluida!');
            toggleShowMidiaInput();
        } catch (er) {
            console.log('\n\n-Erro em handleConfirmEditMidia\n\nErro: ', er);
        }
        toggleUserProfileUpdate();
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const handleConfirmEditData = async () => {
        const formData = new FormData();
        for (const key in userData) {
            // console.log('key: ', key, '\n\nuserData: ', userData, '\n\nuserData[key]: ', userData[key]);
            if (userData[key] instanceof File) {
                formData.append(key, userData[key]);
            } else if (Array.isArray(userData[key])) {
                userData[key].forEach(file => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, userData[key]);
            }
        }
        formData.append('usu_id', user[0].usu_id);

        try {
            const dataResult = await Axios.put("http://localhost:3006/editProfile", formData, {
                'Content-Type': 'multipart/form-data'
            });
        
            setIsLoading(!isLoading);
            await sleep(500);

            const response = await Axios.get("http://localhost:3006/getUser", { // atualizar o usuario logado
                    params: { username: userData.username }
            });  
            
            await sleep(500);

            if (response.data)
                setUser(response.data);

            // Atualizar o perfil do usuário
            toggleUserProfileUpdate();
            toggleShowProfileEdit();
            // Limpar a música selecionada
            setSelectedMusic(null);
            setIsLoading(!isLoading);
            navigate('/' + userData.username);
        } catch (er) {
            console.log('\n\n-Erro em handleConfirmEditData\n\nErro: ', er);
        }

        // atualizar user com os novos dados do banco
        try {
            const response = await Axios.get("http://localhost:3006/getUser", { // busca pelo usuario pesquisado
                params: {
                    username: userData.username
                }
            });

            console.log('\n\n>>response: ', response.data[0]);

            setUser(response.data);

            navigate('/' + userData.username);
        } catch (er) {
            console.error('Erro ao atualizar user com os novos dados do banco\n-Erro: ', er)
        }
        toggleUserProfileUpdate();
    }

    const handleKeyDownData = (event) => {
        if (event.key === 'Enter') {
            handleConfirmEditData();
        }
    };

    const handleKeyDownMidia = (event) => {
        if (event.key === 'Enter') {
            handleConfirmEditMidia();
        }
    };

    const checkRegForm = () => {
        if(!userData.username && !userData.username !== '') 
            {
                return false;
            }
        return true;
    }

    const toggleShowDialogConfirmation = () => {
        if(checkRegForm()){
            toggleConfirmDialogVisible(!isConfirmDialogVisible);
            // toggleUserProfileUpdate();
        }else{
            setLabelErro('Nome obrigatório')
        }
    };

    const maxUserNameLength = '20';

    return (
        <C.ProfileEditContainer>
            {isConfirmDialogVisible && (
                <ConfirmDialog text='Deseja confirmar a edição do perfil?' onConfirm={handleConfirmEditData} />
            )}

            {isMidiaInput && ( /* Componente para adicionar/ alterar midias sociais */
                <C.InputContainer>
                    <C.InputContent>
                        <C.InputHeader>
                            <div onClick={toggleShowMidiaInput}>
                                <img src={closeIcon} alt='' />
                            </div>
                        </C.InputHeader>
                        <C.InputMain>
                            <C.MidiaContainer>
                                <div className='imgContainer'>
                                    <img src={instaIcon} alt='' />
                                </div>
                                <div>
                                    <input type='text' name='instagram' defaultValue={user[0].usu_instagram ? user[0].usu_instagram : userMidia.instagram} placeholder='ex: instagram.com/usuario' onChange={handleChangeMidiaValue} onKeyDown={handleKeyDownMidia} />
                                </div>
                            </C.MidiaContainer>
                            <C.MidiaContainer>
                                <div className='imgContainer'>
                                    <img src={twitterIcon} alt='' />
                                </div>
                                <div>
                                    <input type='text' name='x' defaultValue={user[0].usu_x ? user[0].usu_x : userMidia.x} placeholder='ex: x.com/usuario' onChange={handleChangeMidiaValue} onKeyDown={handleKeyDownMidia} />
                                </div>
                            </C.MidiaContainer>
                            <C.MidiaContainer>
                                <div className='imgContainer'>
                                    <img src={youtubeIcon} alt='' />
                                </div>
                                <div>
                                    <input type='text' name='youtube' defaultValue={user[0].usu_youtube ? user[0].usu_youtube : userMidia.youtube} placeholder='ex: youtube.com/usuario' onChange={handleChangeMidiaValue} onKeyDown={handleKeyDownMidia} />
                                </div>
                            </C.MidiaContainer>
                            <C.MidiaContainer>
                                <div className='imgContainer'>
                                    <img src={spotifyIcon} alt='' />
                                </div>
                                <div>
                                    <input type='text' name='spotify' defaultValue={user[0].usu_spotify ? user[0].usu_spotify : userMidia.spotify} placeholder='ex: open.spotify.com/intl-pt/artist/usuario' onChange={handleChangeMidiaValue} onKeyDown={handleKeyDownMidia} />
                                </div>
                            </C.MidiaContainer>
                            <C.MidiaContainer>
                                <div className='imgContainer'>
                                    <img src={soundcloudIcon} alt='' />
                                </div>
                                <div>
                                    <input type='text' name='soundcloud' defaultValue={user[0].usu_soundcloud ? user[0].usu_soundcloud : userMidia.soundcloud} placeholder='ex: soundcloud.com/usuario' onChange={handleChangeMidiaValue} onKeyDown={handleKeyDownMidia} />
                                </div>
                            </C.MidiaContainer>
                        </C.InputMain>
                        <C.InputFooter>
                            <div>
                                <Button icon={ConfirmIcon} color='#00BF63' onConfirm={handleConfirmEditMidia} />
                            </div>
                        </C.InputFooter>
                    </C.InputContent>
                </C.InputContainer>
            )}

            {!isLoading ? (
                <C.ProfileEditContent>
                    <C.Header>

                        <C.CloseContainer>
                            <img src={closeIcon} alt='Close icon' onClick={toggleShowProfileEdit} />
                        </C.CloseContainer>
                        <label>Editar perfil</label>
                        <C.ProfileContainer>
                            <C.ProfileContent>
                                <C.ProfileImgContainer>
                                    <C.ProfileImg src={userImage ? userImage : user[0].usu_image} />
                                    <input type='file' accept='image/*' name='imagem' onChange={(e) => handleImageChange(e)} />
                                </C.ProfileImgContainer>

                                <C.ProfileName maxLength={maxUserNameLength} name='username' defaultValue={user[0].usu_nomeExb} placeholder='Nome' onChange={handleChangeDataValue} onKeyDown={handleKeyDownData} />
                            </C.ProfileContent>
                            <C.SocialContainer>
                                <div className='midiaContainer'>
                                    <div className='midiaContent'>
                                        <SocialIcon key='instagram' src={instaIcon} borderColor='#FF006E' editContainer={true} iconVisible={false} onClick={toggleShowMidiaInput} />
                                        <SocialIcon key='x' src={twitterIcon} borderColor='#0099FF' editContainer={true} iconVisible={false} onClick={toggleShowMidiaInput} />
                                        <SocialIcon key='add' borderColor='#c3c3c4' editContainer={true} iconVisible={true} imgVisible={false} onClick={toggleShowMidiaInput} />
                                    </div>
                                    <div className='midiaContent'>
                                        <SocialIcon key='youtube' src={youtubeIcon} borderColor='#FB5607' editContainer={true} iconVisible={false} onClick={toggleShowMidiaInput} />
                                        <SocialIcon key='spotify' src={spotifyIcon} borderColor='#FFBE0B' editContainer={true} iconVisible={false} onClick={toggleShowMidiaInput} />
                                        <SocialIcon key='soundcloud' src={soundcloudIcon} borderColor='#8338EC' editContainer={true} iconVisible={false} onClick={toggleShowMidiaInput} />
                                    </div>
                                </div>
                            </C.SocialContainer>
                        </C.ProfileContainer>
                    </C.Header>
                    <C.Main>
                        <C.AboutInputContainer>
                            <C.AboutInput defaultValue={user[0].usu_sobre} name='about' placeholder={!userData.about ? 'Fale mais sobre você..' : ''} onChange={handleChangeDataValue} onKeyDown={handleKeyDownData} />
                        </C.AboutInputContainer>
                    </C.Main>                    
                    <C.Footer>
                        <div className='label-erro'>
                            {labelErro && (
                                <label style={{ textAlign: 'center', color: '#c3c4cc', background: 'rgba(255, 51, 51, .15)', borderRadius: '.2rem', width: '100%' }}>Atenção: {labelErro}</label>
                            )}
                        </div>
                        
                        <div className='button-content'>
                            <Button color='#00BF63' icon={ConfirmIcon} onConfirm={toggleShowDialogConfirmation} />
                        </div>
                    </C.Footer>
                </C.ProfileEditContent>
            ) : (
                <Loading />
            )}
        </C.ProfileEditContainer>
    )
}

export default ProfileEdit