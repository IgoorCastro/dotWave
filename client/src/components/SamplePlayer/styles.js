import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    // gap: 1rem;
`;

export const SamplePlayerContainer = styled.div`
    width: 100%;
    height: 11%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 3%;

    // border: 1px solid green;
`;

export const SamplePlayerIconContainer = styled.div`
    height: 100%;
    width: 15%;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .4rem;

    border: 1px solid rgba(244, 247, 255, .15)
`;


export const SamplePlayerIcon = styled.img`

    height: 45%;
    width: auto;
    
    cursor: pointer;
`;

export const SamplePlayer = styled.div`
    height: 100%;
    width: 45%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    

    border-radius: .3rem;

    border: 1px solid ${({ bgColor }) => bgColor ? `${bgColor}` : '#F4F7FF'}; 
`;

export const SamplePlayerLabel = styled.label`
    width: min-content;
    font-size: 0.7rem;
    font-family: Gueda-Regular;
    
    text-align: center;
    text-transform: uppercase;

    color: #F4F7FF;
`;

export const VolumeBar = styled.div`
    width: 20%;
    display: flex;
    align-items: center; /* Centraliza verticalmente */

    /* Estilo para a input de volume */
    & > input[type="range"] {
        height: 100%;
        width: 100%;
        -webkit-appearance: none; /* Remove o estilo padrão do input range */
        appearance: none;
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
    }

    /* Estilização do track (barra) */
    & > input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 8px; /* Ajuste conforme necessário */
        cursor: pointer;
        background: ${props => props.color || '#C3C4CC'}; /* Cor do track */
        border-radius: 5px;
    }

    /* Estilização do thumb (ponteiro) */
    & > input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px; /* Largura do thumb */
        height: 16px; /* Altura do thumb */
        background: #C3C4CC;
        border-radius: 50%;
        cursor: pointer;
        margin-top: -4px; /* Ajuste para centralizar verticalmente */
    }
`;

export const Dot = styled.input`
    position: absolute;
    top: 50%;
    left: ${({ volume }) => `${volume}%`};
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: ${({ color }) => color ? `${color}` : '#F4F7FF'};
`;


export const MuteContainer = styled.div`
    width: 8%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .4rem;

    cursor: pointer;

    border: 1px solid #F4F7FF;
`;

export const Mute = styled.img`
    height: 35%;
    width: auto;

    aspect-ratio: 1/1;
`;