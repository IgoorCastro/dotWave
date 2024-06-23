import styled, { keyframes, css } from 'styled-components';

export const AnimateContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.5;

    position: fixed; /* Para garantir que o loader fique sempre visível */
    top: 0;
    left: 0;
    z-index: 1; /* Define a ordem de empilhamento, alto o suficiente para ficar na frente */

    // border: 1px solid green;
`;

export const AnimateContent = styled.div`
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    
    // border: 1px solid red;
`;

// Configurações da animação com keyframess
const slide = keyframes`
    
    0% {filter: opacity(0)} 
    40% {filter: opacity(1) blur(0);}
    100% {filter: opacity(1) blur(15px);}
`;

export const AnimateBackground = styled.div`
    height: 160px;
    width: 160px;

    ${({ blur }) => blur ? css`
        animation: ${slide} 5s forwards;
    ` : css`
        & > img {
            filter: blur(13px);
        }
    `};

    // border: 1px solid blue;
`;

export const AnimateImg = styled.img`
    width: 100%;
    height: 100%;
`;