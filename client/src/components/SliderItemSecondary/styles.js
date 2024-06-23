import styled from "styled-components";

export const SliderCenterContent = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: .1rem;

    // border: 1px solid red;
`;

export const SliderItemContainer = styled.div`
    width: 100%;
    height: 77%;

    display: flex;
    align-items: center;
    justify-content: center;

    overflow: hidden; /* Oculta o conteúdo que estiver fora do container */

    position: relative; /* É importante para as transformações funcionarem corretamente */
    transition: transform 0.3s ease;
    ${({ position }) => position === 'left' ? `transform: translateX(-50%)` : `transform: translateX(+50%)`};

    &:hover {
        ${({ position }) => position === 'left' ? 'transform: translateX(0);' : 'transform: translateX(0);'}
    }

    

    // border: 1px solid red;
`;