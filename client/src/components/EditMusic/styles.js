import styled from "styled-components";

export const AddMusicContainer = styled.div`
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

export const AddMusicContent = styled.div`
    width: 30%;
    min-width: 420px;
    height: 70%;
    min-height: 520px;
    max-height: 70%; // Ajuste o max-height com base na viewport 

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    background-color: rgba(30, 30, 30, 0.95);

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

export const Header = styled.div`
    height: 7%;
    max-height: 200px;
    width: 90%;

    display: flex;
    justify-content: end;
    align-items: end;

    & > img {
        cursor: pointer;
    }

    // border: 1px solid green;
`;

export const Main = styled.div`
    height: 50%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    // border: 1px solid blue;
`;

export const MainContentTop = styled.div`
    height: 45%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;       

    // border: 1px solid red;
`;

export const MusicCover= styled.div`
    position: relative;
    height: 100%;
    width: 100%;
    
    aspect-ratio: 1/1;

    border-radius: .6rem;
    
    display: flex;
    justify-content: center;
    align-items: center;   

    cursor: pointer;

    & > input{
        display: block;
        height: 100%;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        opacity: 0;
        cursor: pointer;

        // border: 1px solid red;
    }
    
    & > img{
        width: 100%;
        height: auto;
        max-height: 100%;

        border-radius: .6rem;
    }
    

    border: 2px solid #f4f7ff;
`;

export const TopRightSection = styled.div`    
    width: auto;
    height: 98%;
    
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & > *{
        margin-left: 3%;
    }

    & > textarea{
        width: max-content;
        max-width: 100%;
        height: 40%;
        max-height: 40%;

        font-size: 1.5rem;
        font-family: TheBoldFont;
        text-decoration: underline;
        text-align: start;

        outline: none;
        border: none;

        resize: none;

        color: #c3c4cc;

        background: none;
        border: none;

        &::placeholder { 
            color: #fff; 
            opacity: 0.4; 
        }

        // border: 1px solid red;
    }

    // border: 1px solid green;
`;

export const UploadContainer = styled.div`
    position: relative;
    height: 20%;
    width: 70%;

    display: flex;
    flex-direction: row;
    align-items: center;

    cursor: pointer;

    & * .audioName {
        max-width: 70%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    & > input[type='file'] {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        
        cursor: pointer;
    }

    & > .left-section {
        position: absolute;
        top: 0;
        left: 0;
        width: 90%;
        height: 100%;
        display: flex;
        align-items: center;

        border-radius: .5rem;

        border: 2px solid #c3c4cc;
    }

    & > .right-section {
        position: absolute;
        top: 0;
        right: 0;
        width: 10%;
        height: 100%;

        display: flex;
        justify-content: right;
        align-items: center;
    }

    & > .left-section > .icon {
        height: 100%;
        width: auto;

        aspect-ratio: 1/1;
        
        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
            height: 90%;
            width: auto;
        }
        
        background: #c3c4cc; 
    }   

    & > .left-section > p {
        margin: auto;
        color: #c3c4cc;
    }

    & > .right-section > img {
        height: 50%;
        width: auto;
    }
    
    //border: 1px solid red;
`;

export const MainContentCenter = styled.div`
    height: 55%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    & label {
        color: #c3c4cc;

        text-transform: uppercase;
    }

    // border: 1px solid red;
`;

export const CostContainer = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;     
    align-items: center;

    & > div {
        height: 50%;
        width: 30%;
        max-width: 50%;

        display: flex;
        align-items: center;

        & input {
            width: 100%;
            height: 100%;

            background: none;
            border: none;

            color: #c3c4cc;
            font-size: 2rem;
            text-align: center;
            text-decoration: underline;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;

            outline: none;
            box-sizing: content-box; /* Inclui padding na largura do conteúdo */
            
            /* Remover setas no Chrome, Safari, Edge, Opera */
            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                -webkit-appearance: none;
                margin: 0;
            }
            
            /* Remover setas no Firefox */
            -moz-appearance: textfield;
        }
        // border: 1px solid red;
    }
    
    // border: 1px solid blue;
`;

export const AboutContainer = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;     
    align-items: center;

    & input {
        width: 70%;
        background: none;
        border: none;

        color: #c3c4cc;
        font-size: 1.2rem;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;

        outline: none;
        box-sizing: content-box; /* Inclui padding na largura do conteúdo */

        border-radius: .2rem;
        border: 1px solid #c3c4cc;
    }

    & > div {
        width: 100%;
        height: min-content;

        display: flex;
        justify-content: space-between;
        align-items: center;        
    }

    // border: 1px solid purple;
`;

export const MainContentBottom = styled.div`
    height: 45%;
    width: 100%;

    cursor: pointer;
    
    border: 1px solid green;
`;

export const SamplesContainer = styled.div`
    min-height: 60%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // border: 1px solid blue;

    cursor: pointer;
`;

export const Footer = styled.div`
    height: 43%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // border: 1px solid green;
`;

export const UploadSampleContainer = styled.div`
    width: 100%;
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-ttems: center;

    & > .upl-title {
        height: 30%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        & > label {
            height: min-content;
            font-size: 1.5rem;
            font-family: TheBoldFont;
            text-decoration: underline;
            text-align: start;        
        }
    }

    // border: 1px solid blue;
`;

export const UploadSampleSection = styled.div`
    width: 100%;
    height: 28%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;

    // border: 1px solid red;
`;

export const ButtonContainer = styled.div`
    height: 30%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        width: 30%;
        height: 50%;
    }

    // border: 1px solid purple;
`;

export const UploadSampleContent = styled.div`
    width: 100%;
    height: 70%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    // border: 1px solid blue;
`; 

