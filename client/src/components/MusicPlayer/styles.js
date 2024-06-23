import styled from "styled-components";

export const PlayerContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(30, 30, 30, .4);

    position: fixed;
    top: 0;
    left: 0;

    overflow-y: auto;

    z-index: 999;
    
    overflow: hidden; /* Evita rolagem na página principal */
`;

export const PlayerContent = styled.div`
    width: 85%;
    min-width: 860px;
    height: 85%;
    max-height: 85%; // Ajuste o max-height com base na viewport 

    display: flex;
    flex-direction: column;
    background-color: rgba(30, 30, 30, 0.99);

    overflow-y: auto;

    /* Configurações de barra de rolagem para WebKit e Firefox */
    scrollbar-width: auto;
    scrollbar-color: #f4f7ff rgba(30, 30, 30, .2);

    border-radius: .2rem;

    &::-webkit-scrollbar {
        width: 7px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #f4f7ff;
        border-radius: 3px;
        border: 0px solid #ffffff;
    }

    border: 1px solid #000000;
`;

export const PlayerHeader = styled.section`
    width: 98%;
    height: 7%;

    display: flex;
    justify-content: end;  
    align-items: end;  

    & > img {
        height: 50%;
        width: auto;

        margin-right: 1%;

        border-radius: .2rem;

        &:hover{
            background-color: rgba(30, 30, 30, .1);
        }

        cursor: pointer;
    }
    
    // border: 1px solid green;
`;

export const PlayerMain = styled.section`
    width: 100%;
    height: 93%;
    
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // border: 1px solid red;
`;

export const MusicContainer = styled.div`
    height: 30%;
    min-height: 200px;
    width: 80%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    // border: 1px solid purple;
`;

export const MusicContent = styled.div`
    height: 90%;
    min-height: 200px;
    width: 100%;
    min-width: 457px;


    display: flex;
    flex-direction: row;
    justify-content: space-between;

    //  border: 1px solid blue;
`;

export const MusicSection = styled.section`
    height: 100%;
    min-height: 200px;
    width: 60%;
    min-width: 460px;

    display: flex;
    flex-direction: row;
    justify-content: left;
    align-items: center;

    // border: 1px solid #fff;
`;

export const MusicImageContainer = styled.div`
    height: 100%;
    width: auto;

    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid green;
`;

export const MusicImage = styled.img`
    height: 100%;    
    min-width: 100%;
    width: auto;
   

    border-radius: .7rem;
    border: 1px solid #fff;
`;

export const PlayerDetails = styled.div`
    height: 100%;
    min-height: 200px;
    width: 75%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > *:first-child {
        margin-left: 2%;
    }

    & > *:last-child {
        margin-left: 2%;
    }

    // border: 1px solid red;
`;

export const MusicDatils = styled.div`
    width: 40%;
    max-width: 40%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: end;

    & > * {
        margin-bottom: 1%;
    }

    & > *:first-child {
        margin-left: 2%;
    }

    & > *:last-child {
        margin-right: 2%;
    }

    // border: 1px solid yellow;
`;

export const Title = styled.h1`
    width: max-content; 

    font-size: ${({ fs }) => fs ? `${fs}rem` : '2.35rem'}; 
    font-family: TheBoldFont;
    text-transform: uppercase;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    color: #F4F7FF;

    // border: 1px solid green;
`;

export const MusicPlayerContainer = styled.div`
    height: 20%;
    max-width: 100%;

    border-radius: .4rem;
    
    color: #F4F7FF;
    border: 1px solid white;
`;

export const Label = styled.label`
    font-size: 0.7rem;
    font-family: Gueda-Regular;
    
    text-align: center;
    text-transform: uppercase;

    color: #F4F7FF;
`;

export const ElementsContainer = styled.div`
    height: 70%;
    min-height: 250px;
    width: 80%;
    min-width: 457px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    // border: 1px solid yellow;
`;

export const ElementsContentHeader = styled.div`
    height: 10%;
    width: 100%;
    min-width: 457px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; 

    // border: 1px solid blue;
`;

export const ElementsIcon = styled.img`
    height: 20%;
    width: auto;

    &:hover{
        height: 22%;
    }

    cursor: pointer;
`;

export const ElementsContentSamples = styled.div`
    height: 90%;
    min-height: 250px;
    width: 100%;
    min-width: 457px;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    // border: 1px solid yellow;
`;
