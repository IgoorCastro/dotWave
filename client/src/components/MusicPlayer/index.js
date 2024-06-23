import React from 'react';
import * as C from './styles';

import Player from '../Player';
import exitIcon from '../../assets/exitIcon.svg';
import elementsIcon from '../../assets/playerIcons/elements.svg';

import { useMainContext } from '../../context/DataContext';
import SamplePlayer from '../SamplePlayer';

const MusicPlayer = () => {
    const { toggleMusicPlayerVisible, selectedMusic } = useMainContext();

    const togglerSampleVisible = () => {
        toggleMusicPlayerVisible();
    }
    
    return (
        <C.PlayerContainer>
            <C.PlayerContent>
                <C.PlayerHeader>
                    <img src={exitIcon} onClick={togglerSampleVisible} alt='Exit' />
                </C.PlayerHeader>

                <C.PlayerMain>
                    <C.MusicContainer>
                        <C.MusicContent>
                            <C.MusicSection>
                                <C.MusicImageContainer>
                                    <C.MusicImage src={selectedMusic.mus_capa} />
                                </C.MusicImageContainer>

                                <C.PlayerDetails>
                                    <C.Title>{selectedMusic.mus_titulo}</C.Title>
                                    {/* <C.Label>{trackTest.tempo}</C.Label> */}

                                    <C.MusicPlayerContainer>
                                        <Player music={selectedMusic.mus_audio} />
                                    </C.MusicPlayerContainer>
                                </C.PlayerDetails>
                            </C.MusicSection>

                            <C.MusicDatils>
                                <C.Label>INTERPRETADA POR: <br />{selectedMusic.mus_autor}</C.Label>
                                <C.Label>COMPOSTA POR: <br />{selectedMusic.mus_composicao}</C.Label>
                                <C.Label>PRODUZIDA POR: <br />{selectedMusic.mus_producao}</C.Label>
                            </C.MusicDatils>
                        </C.MusicContent>
                    </C.MusicContainer>

                    <C.ElementsContainer>
                        <C.ElementsContentHeader>
                            <C.Title fs={1.7}>
                                Elementos
                            </C.Title>
                            <C.ElementsIcon src={elementsIcon} />
                        </C.ElementsContentHeader>

                        <C.ElementsContentSamples>
                            <SamplePlayer musicId={selectedMusic.mus_id}/>
                        </C.ElementsContentSamples>
                    </C.ElementsContainer>
                </C.PlayerMain>
            </C.PlayerContent>
        </C.PlayerContainer >
    )
}

export default MusicPlayer;
