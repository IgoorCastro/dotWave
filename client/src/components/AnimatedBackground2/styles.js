import styled from 'styled-components';

export const AnimatedContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    opacity: 0.9;

    position: fixed; /* Para garantir que o loader fique sempre visível */
    top: 0;
    left: 0;
    z-index: 1; 

    // border: 1px solid green;
`;

// Configurações da animação com keyframess
// const slide = keyframes`

//     0% {filter: opacity(0)} 
//     40% {filter: opacity(1) blur(0);}
//     100% {filter: opacity(1) blur(15px);}
// `;

// export const AnimatedBackground = styled.div`
//     height: 160px;
//     width: 160px;

//     ${({ blur }) => blur ? css`
//         animation: ${slide} 5s forwards;
//     ` : css`
//         & > img {
//             filter: blur(13px);
//         }
//     `};

//     // border: 1px solid blue;
// `;

export const BlobContainer = styled.div`
    position: absolute;
    width: 30%;
    height: 30%;
    opacity: 25%;
    filter: blur(1px);
`;

export const StyledSvg = styled.svg`
    width: 100%;
    height: 100%;
`;