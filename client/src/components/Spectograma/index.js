import React, { useRef, useEffect } from 'react';
import * as C from './styles';

const Spectograma = () => {
    const inputSoundStyle = { display: 'none' };
    const lblPlayStyle = {
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        width: '40px',
        height: '40px',
        margin: 'auto',
        border: 'solid 2px #00ff55',
        borderRadius: '50%',
        backgroundColor: '#000000',
        cursor: 'pointer'
    };
    const imgPlayStyle = { height: '25px', margin: '7px 10px' };

    // Criando uma referência para o elemento de áudio
    const audioRef = useRef(null);
    const sourceNodeRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            const audioElement = audioRef.current;

            // Verifica se já existe um nó de origem de mídia conectado
            if (sourceNodeRef.current) {
                // Desconecta o nó de origem de mídia existente
                sourceNodeRef.current.disconnect();
            }

            // Cria um novo nó de origem de mídia
            const audioContext = new AudioContext();
            //const sourceNode = audioContext.createMediaElementSource(audioElement);

            // Armazena a referência para o novo nó de origem de mídia
            //sourceNodeRef.current = sourceNode;

            // Agora você pode usar 'sourceNode' conforme necessário
        }
    }, [audioRef]);

    return (
        <C.Container>
            <C.Canvas />
            {/* Passando a referência para o elemento de áudio */}
            <C.Audio ref={audioRef} src="https://jakeactually.com/codepen/spectrogram/Sum 41 - Still Waiting.mp3" crossOrigin="anonymous" />
            <C.Form>
                <C.Label>
                    <C.Input name="sound" type="file" style={inputSoundStyle} />
                    <C.Image src="https://jakeactually.com/codepen/spectrogram/clicker.svg" />
                </C.Label>
                <C.Label onClick={() => alert('Clicou')} style={lblPlayStyle}>
                    <C.Image src="https://jakeactually.com/codepen/spectrogram/play-button.svg" style={imgPlayStyle} />
                </C.Label>
            </C.Form>
            Olá
        </C.Container>
    );
};

export default Spectograma;
