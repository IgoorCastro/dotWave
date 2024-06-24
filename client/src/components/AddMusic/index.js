import React, { useRef, useState } from 'react';
import * as C from './styles';
import Axios from 'axios';

import exitIcon from '../../assets/profileEditIcons/closeIcon.svg';
import uploadIcon from '../../assets/uploadIcon.svg';
import vinilIcon from '../../assets/vinilIcon.svg';
import vocalIcon from '../../assets/playerIcons/vocal.svg';
import pianolIcon from '../../assets/playerIcons/piano.svg';
import perclIcon from '../../assets/playerIcons/percussao.svg';
import baixoIcon from '../../assets/playerIcons/baixo.svg';
import confirmIcon from '../../assets/confirmIcon.svg';

import Button from '../Button';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';
import ConfirmDialog from '../../components/ConfirmDialog';

const AddMusic = () => {
    const { toggleAddMusicVisible, toggleUserProfileUpdate, isConfirmDialogVisible, toggleConfirmDialogVisible } = useMainContext();
    const { user, token } = useAuthContext();
    const [musicCover, setMusicCover] = useState(null);
    const [labelErro, setLabelErro] = useState(null);
    const [audioName, setAudioName] = useState(null);
    const [sampleName, setSampleName] = useState({
        sample1: '',
        sample2: '',
        sample3: '',
        sample4: ''
    });
    const [newMusic, setNewMusic] = useState({
        composicao: 'desconhecido',
        producao: 'desconhecido',
        titulo: null,
        audio: null,
        valor: null,
        capa: null,
        usu_id: Array.isArray(user) ? user[0].usu_id : user.usu_id,
        autor: Array.isArray(user) ? user[0].usu_nomeExb : user.usu_nomeExb,
        sample1: null,
        sample2: null,
        sample3: null,
        sample4: null
    });
    const audioInput = useRef(null);
    const sampleRefs = {
        sample1: useRef(null),
        sample2: useRef(null),
        sample3: useRef(null),
        sample4: useRef(null)
    };

    const handleChangeValues = (event) => {
        const { name, value } = event.target;
        setNewMusic(prevValues => ({
            ...prevValues,
            [name]: value,
        }));
        // console.log('newMusic: ', newMusic);
    }

    const checkRegForm = () => {
        if(!newMusic.titulo || !newMusic.audio || !newMusic.valor || !newMusic.capa) 
            return false;
        return true;
    }

    const handleShowDialogConfirmation = () => {
        if(checkRegForm())
            toggleConfirmDialogVisible(!isConfirmDialogVisible);
        else{
            setLabelErro('Campos titulo, musica, valor e capa obrigatórios');
            return;
        }
            
    };   

    const handleConfirmReg = () => {
        // console.log('handleConfirmReg');       
        const formData = new FormData();
        for (const key in newMusic) {
            if (newMusic[key] instanceof File) {
                formData.append(key, newMusic[key]);
            } else if (Array.isArray(newMusic[key])) {
                newMusic[key].forEach(file => {
                    formData.append(key, file);
                });

            } else {
                formData.append(key, newMusic[key]);
            }
        }
        formData.append('usu_token', token);
        formData.append('usu_nomeExb', user[0].usu_nomeExb);

        // // Logando o conteúdo do FormData
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ', pair[1]);
        // }

        // usar o id ao invez do nome!
        Axios.post("http://localhost:3006/addMusic", formData, {
            'Content-Type': 'multipart/form-data',
            usu_id: newMusic.usu_id,
            usu_token: token,
            usu_nomeExb: user[0].nomeExb
        })
            .then((response) => {
                alert("Registro concluído");
                toggleAddMusicVisible();
                toggleUserProfileUpdate();
            })
            .catch((e) => {
                if (e.response) {
                    console.error("--erro status:", e.response.status);
                    console.error("--dados do erro:", e.response.data);
                } else if (e.request) {
                    console.log("Sem resposta do servidor:", e.request);
                } else {
                    console.error("--erro requisição:", e.message);
                }
            });

    }

    const handleAddMusicVisible = () => {
        toggleAddMusicVisible();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
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
                setMusicCover(URL.createObjectURL(file));
                setLabelErro(null);

                // Atualize a propriedade "capa" do objeto newMusic
                setNewMusic(prevValues => ({
                    ...prevValues,
                    capa: file,
                }));
            } else {
                setMusicCover(null);
                setLabelErro('A imagem deve ser quadrada');
            }
        };
        img.src = URL.createObjectURL(file);
    }

    const handleChangeSample = (event, sampleName) => {
        const file = event.target.files[0];
        // console.log(file, '\nSample: ', sampleName);
        if (!file) return;

        if (!file.type.startsWith('audio/')) {
            setLabelErro('O arquivo selecionado não é um áudio válido.');
            setSampleName({
                [sampleName]: ''
            });
            return;
        }

        // Atualize o estado apenas para o sample correspondente
        setLabelErro(null);
        setSampleName(prevState => ({
            ...prevState,
            [sampleName]: file.name
        }));
        setNewMusic(prevValues => ({
            ...prevValues,
            [sampleName]: file,
        }));
    };

    const uploadAudioInput = () => {
        if (audioInput.current) {
            audioInput.current.click();
        }
    }

    const handleChangeAudioName = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('audio/')) {
            setLabelErro('O arquivo selecionado não é um áudio válido.');
            setAudioName(null);
            return;
        }

        const validAudioTypes = ['audio/mpeg', 'audio/wav'];
        if (!validAudioTypes.includes(file.type)) {
            setLabelErro('Formatos aceitos: mp3 ou wav');
            setAudioName(null);
            return;
        }

        setLabelErro(null);
        setAudioName(file.name);
        setNewMusic(prevValues => ({
            ...prevValues,
            audio: file,
        }));

        // console.log('newMusic: ', newMusic);
    };

    return (
        <C.AddMusicContainer>
            {isConfirmDialogVisible && (
                <ConfirmDialog text='Confirmar registro da musica?' onConfirm={handleConfirmReg} />
            )}

            <C.AddMusicContent>
                <C.Header>
                    <img src={exitIcon} alt='' onClick={handleAddMusicVisible} />
                </C.Header>
                <C.Main>
                    <C.MainContentTop>
                        <C.MusicCover isicon={musicCover ? !musicCover.toString() : 'false'} >
                            <img src={musicCover || uploadIcon} style={{ width: musicCover ? '100%' : '' }} alt='' />
                            <input type='file' accept='image/*' name='capa' onChange={(e) => handleImageChange(e)} />
                        </C.MusicCover>
                        <C.TopRightSection>
                            <textarea placeholder='NOME' maxLength='35' name='titulo' onChange={handleChangeValues} />
                            <C.UploadContainer onClick={uploadAudioInput}>
                                <div className="left-section">
                                    <div className="icon">
                                        <img src={vinilIcon} alt="Imagem" />
                                    </div>
                                    <p className='audioName'>{audioName}</p>
                                </div>
                                <div className="right-section">
                                    <img src={uploadIcon} alt="Outra Imagem" />
                                </div>
                                <input type="file" accept="audio/*" ref={audioInput} name='audio' onChange={handleChangeAudioName} style={{ display: 'none' }} />
                            </C.UploadContainer>
                        </C.TopRightSection>
                    </C.MainContentTop>
                    <C.MainContentCenter>
                        <C.CostContainer>
                            <label>valor: </label>
                            <div>
                                <label style={{ marginRight: '2%' }}>R$</label>
                                <input type='number' placeholder='0,00' name='valor' onChange={handleChangeValues} />
                            </div>
                        </C.CostContainer>
                        <C.AboutContainer>
                            <div>
                                <label>composição:</label>
                                <input type='text' name='composicao' onChange={handleChangeValues} />
                            </div>
                            <div>
                                <label>produção:</label>
                                <input type='text' name='producao' onChange={handleChangeValues} />
                            </div>
                        </C.AboutContainer>
                    </C.MainContentCenter>
                </C.Main>
                <C.Footer>
                    <C.UploadSampleContainer>
                        <div className='upl-title'>
                            <label style={{ color: '#c3c4cc' }}>
                                Faixas
                            </label>
                        </div>
                        <C.UploadSampleContent>
                            <C.UploadSampleSection>
                                <div style={{ position: 'relative', width: '35%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ width: '87%', height: '100%', border: '1px solid #FFBE08', borderRadius: '.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ height: '100%', width: 'auto', aspectRatio: '1/1', background: '#FFBE08', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={vocalIcon} alt='' style={{ height: '60%', width: 'auto' }} />
                                        </div>
                                        <label style={{ width: '65%', textAlign: 'center', height: 'min-content', color: '#c3c4cc', overflow: 'hidden' }}>{sampleName.sample1 ? sampleName.sample1 : 'Vocal'}</label>
                                    </div>
                                    <img src={uploadIcon} alt='' style={{ height: '40%', width: 'auto', marginLeft: '2%' }} onClick={() => alert('321')} />
                                    <input type="file" accept="audio/*" ref={sampleRefs.sample1} name='sample1' onChange={(e) => handleChangeSample(e, 'sample1')}
                                        style={{ display: 'block', height: '100%', width: '100%', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', opacity: '0', cursor: 'pointer' }} />
                                </div>

                                <div style={{ position: 'relative', width: '35%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ width: '87%', height: '100%', border: '1px solid #FB5607', borderRadius: '.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <div style={{ height: '100%', width: 'auto', aspectRatio: '1/1', background: '#FB5607', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={perclIcon} alt='' style={{ height: '60%', width: 'auto' }} />
                                        </div>
                                        <label style={{ width: '65%', textAlign: 'center', height: 'min-content', color: '#c3c4cc', overflow: 'hidden' }}>{sampleName.sample2 ? sampleName.sample2 : 'Percussão'}</label>
                                    </div>
                                    <input type="file" accept="audio/*" ref={sampleRefs.sample2} name='sample2' onChange={(e) => handleChangeSample(e, 'sample2')}
                                        style={{ display: 'block', height: '100%', width: '100%', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', opacity: '0', cursor: 'pointer' }} />
                                    <img src={uploadIcon} alt='' style={{ height: '40%', width: 'auto', marginLeft: '2%' }} />
                                </div>
                            </C.UploadSampleSection>

                            <C.UploadSampleSection>
                                <div style={{ position: 'relative', width: '35%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ width: '87%', height: '100%', border: '1px solid #FF006E', borderRadius: '.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="file" accept="audio/*" ref={sampleRefs.sample3} name='sample3' onChange={(e) => handleChangeSample(e, 'sample3')}
                                            style={{ display: 'block', height: '100%', width: '100%', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', opacity: '0', cursor: 'pointer' }} />
                                        <div style={{ height: '100%', width: 'auto', aspectRatio: '1/1', background: '#FF006E', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={baixoIcon} alt='' style={{ height: '60%', width: 'auto' }} />
                                        </div>
                                        <label style={{ width: '65%', textAlign: 'center', height: 'min-content', color: '#c3c4cc', overflow: 'hidden' }}>{sampleName.sample3 ? sampleName.sample3 : 'Baixo'}</label>
                                    </div>
                                    <img src={uploadIcon} alt='' style={{ height: '40%', width: 'auto', marginLeft: '2%' }} />
                                </div>

                                <div style={{ position: 'relative', width: '35%', height: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                                    <div style={{ width: '87%', height: '100%', border: '1px solid #0099FF', borderRadius: '.3rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                        <input type="file" accept="audio/*" ref={sampleRefs.sample4} name='sample4' onChange={(e) => handleChangeSample(e, 'sample4')}
                                            style={{ display: 'block', height: '100%', width: '100%', position: 'absolute', top: '0', bottom: '0', left: '0', right: '0', opacity: '0', cursor: 'pointer' }} />
                                        <div style={{ height: '100%', width: 'auto', aspectRatio: '1/1', background: '#0099FF', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            <img src={pianolIcon} alt='' style={{ height: '60%', width: 'auto' }} />
                                        </div>
                                        <label style={{ width: '65%', textAlign: 'center', height: 'min-content', color: '#c3c4cc', overflow: 'hidden' }}>{sampleName.sample4 ? sampleName.sample4 : 'Synth/ Keys'}</label>
                                    </div>
                                    <img src={uploadIcon} alt='' style={{ height: '40%', width: 'auto', marginLeft: '2%' }} />
                                </div>
                            </C.UploadSampleSection>
                        </C.UploadSampleContent>
                    </C.UploadSampleContainer>
                    {labelErro && (
                        <label style={{ textAlign: 'center', color: '#c3c4cc', background: 'rgba(255, 51, 51, .15)', borderRadius: '.2rem', width: '100%' }}>Atenção: {labelErro}</label>
                    )}
                    <C.ButtonContainer>
                        <div>
                            <Button color='#00BF63' icon={confirmIcon} onConfirm={handleShowDialogConfirmation} />
                        </div>
                    </C.ButtonContainer>
                </C.Footer>
            </C.AddMusicContent>
        </C.AddMusicContainer>
    )
}


export default AddMusic;
