import React from 'react';
import * as C from './styles';
import Axios from 'axios';

import editIconV2 from '../../assets/editIconV2.svg';
import deleteIcon from '../../assets/deleteIcon.svg';

import EditMusic from '../../components/EditMusic';
import ConfirmDialog from '../ConfirmDialog';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

const TrackCardNew = ({ props, showTitle }) => {
    const { toggleMusicPlayerVisible, setSelectedMusic, isEditMusicVisible, toggleEditMusicVisible, toggleUserProfileUpdate, toggleConfirmDialogVisible, isConfirmDialogVisible } = useMainContext();
    const { user } = useAuthContext();

    const togglerSampleVisible = () => {
        toggleMusicPlayerVisible();
    }

    const handleChangeSelectedMusic = () => {
        setSelectedMusic(props);
    }

    const handleShowDialogConfirmation = () => {
        toggleConfirmDialogVisible(!isConfirmDialogVisible);
    };

    const handleDeleteItem = async () => {
        try{
            if(props){
                const result = await Axios.delete(`http://localhost:3006/delete/${props.mus_id}`);
            if(result)
                console.log(result);
            else
                console.log('>> Atenção: Função de delete falhou!');
            
            }
            toggleUserProfileUpdate();
        }catch(err){
            console.error(err);
        }
    }

    const togglerEditMusic = () => {
        toggleEditMusicVisible();
    }

    return (
        <C.Container key={props.mus_id} onClick={handleChangeSelectedMusic} >
            {isConfirmDialogVisible && (
                <ConfirmDialog text='Deseja deletar a musica?' onConfirm={handleDeleteItem} />
            )}
            {isEditMusicVisible && (
                <EditMusic music={props} />
            )}
            {user && (props.usu_id === user[0].usu_id) && (
                <C.IconContainer className="icon-container">
                    <C.Icon src={deleteIcon} onClick={handleShowDialogConfirmation} />
                    <C.Icon src={editIconV2} onClick={togglerEditMusic} />
                </C.IconContainer>
            )}
            <C.CardContent>
                <C.CardBackImg src={props.mus_capa} onClick={togglerSampleVisible} />
                <C.CardImgContent>
                    <C.CardImg src={props.mus_capa} onClick={togglerSampleVisible} />
                </C.CardImgContent>
            </C.CardContent>
            <C.CardTitle>{showTitle && props.mus_titulo}</C.CardTitle>
        </C.Container>
    )
}

export default TrackCardNew
