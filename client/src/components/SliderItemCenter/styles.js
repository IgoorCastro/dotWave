import styled from "styled-components";

export const SliderCenterContent = styled.div`
    width: 100%;
    height: 99%;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: .1rem;

    // border: 1px solid blue;
`;

export const SliderItemContainer = styled.div`
    width: 20%;
    height: 95%;
    min-width: 160px;

    display: flex;
    align-items: center;
    justify-content: center;

    // border: 1px solid red;
`;

export const SliderButtonContainer = styled.div`
    width: 10%;
    height: 50%; 
    
    display: flex;
    justify-content: center;
    align-items: center;

    cursor: pointer;

    // border: 1px solid red;
`;

export const SliderButton = styled.div`
    width: 20px; 
    height: 20px;

    border-radius: 50%; 

    ${({ icon }) => icon && `
        background-image: url(${icon});
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
    `}

    position: relative; /* É importante para as transformações funcionarem corretamente */
    transition: transform 0.3s ease;
    &:hover {
        ${({ position }) => position === 'right' ? 'transform: translateX(+5px);' : 'transform: translateX(-5px);'}
    }

    cursor: pointer;

    // border: 1px solid black;
`;
