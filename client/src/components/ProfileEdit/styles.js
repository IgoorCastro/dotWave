import styled from "styled-components";

export const ProfileEditContainer = styled.div`
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

export const ProfileEditContent = styled.div`
    width: 45%;
    //min-width: 650px;
    height: 70%;
    //max-height: 70%; // Ajuste o max-height com base na viewport 

    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    height: 45%;
    width: 90%;

    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    & > label {
        position: absolute;

        color: #c3c4cc;
        font-size: 1.4rem;
        font-family: TheBoldFont;

        margin-top: 3%;
    }

    // border: 1px solid red;
`;

export const CloseContainer = styled.div`
    height: 15%;
    width: 100%;

    position: relative;
    left: 0;

    display: flex;
    justify-content: end;
    align-items: end;

    // border: 1px solid blue;

    & > img{
        height: 50%;
        width: auto;

        cursor: pointer;   
        
        // border: 1px solid blue;
    }
`;

export const ProfileContainer = styled.div`
    height: 85%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    // border: 1px solid red;
`;

export const ProfileContent = styled.div`
    width: 80%;
    height: 100%;
    
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;

    // border: 1px solid red;
`;

export const ProfileImgContainer = styled.div`
    position: relative;
    height: 60%;
    width: auto;    

    aspect-ratio: 1/1;

    border-radius: 1.2rem;

    cursor: pointer;
    &:hover {
        border: 2px solid #C3C3C4;
        box-sizing: border-box;
    }

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

        
    }

    // border: 1px solid blue;
`;

export const ProfileImg = styled.img`
    height: 100%;
    width: auto;    

    aspect-ratio: 1/1;

    border-radius: 1.2rem;

    // border: 2px solid #c3c4cc;    
`;

export const ProfileName = styled.textarea`

    width: min-content;
    height: min-content;

    font-size: 1.5rem;
    font-family: Gueda-Bold;
    text-decoration: underline;
    text-transform: uppercase;

    margin-left: 2%;

    outline: none;
    border: none;

    resize: none;

    color: #c3c4cc;

    background: none;
    border: none;
    // border: 1px solid red;
`;

export const SocialContainer = styled.div`
    width: 23%;
    height: 42%;
    
    // border: 1px solid blue;

    & > .midiaContainer {
        width: 100%;
        height: 100%;

        display: flex;
        flex-direction: column;        
        justify-content: center;
        align-items: center;
        
        // border: 1px solid red;

        & > .midiaContent {
            height: 50%;
            width: 100%;

            display: flex;
            flex-direction: row;            
            justify-content: space-around;
            align-items: center;
        }
    }
`;

export const AddSocialMidiaContainer = styled.div`    
    height: 80%;
    width: auto;

    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .6rem;

    cursor: pointer;

    & > img{
        
    }

    border: 1px solid white;
`;

export const AboutInputContainer = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    border-radius: .2rem;

    border: 2px solid #c3c4cc;
`;

export const AboutInput = styled.textarea`
    width: 90%;
    max-width: 90%;
    height: auto;

    outline: none;
    border: none;

    font-size: 1rem;
    padding: 8px 7px;
    text-align: start;

    resize: none;

    // white-space: normal;
    // word-wrap: break-word;
    // overflow-wrap: break-word;

    color: #c3c4cc;

    background: none;
    border: none;
`;

export const SampleContainer = styled.div`
    width: 100%;
    height: 50%;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    gap: .8rem;

    // border: 1px solid yellow;
`;

export const SampleContent = styled.div`
    position: relative;
    height: 80%;
    width: auto;
    max-width: 16.66%;
    
    border-radius: .3rem;

    cursor: pointer;

    & > img {
        height: 100%;
        width: auto;

        object-fit: cover;

        border-radius: .3rem;

        // border: 1px solid #c3c4cc;
    }

    // border: 1px solid #c3c4cc;
`;

export const AddSampleContent = styled.div`
    position: relative;
    height: 80%;
    width: auto;
    max-width: 16.66%;

    display: flex;
    jutisfy-content: center;
    align-items: center;
    
    border-radius: .3rem;

    cursor: pointer;

    & > img {
        height: 60%;
        width: auto;

        object-fit: cover;

        border-radius: .3rem;

        // border: 1px solid #c3c4cc;
    }
`;

export const SampleIgmg = styled.img`
    
`;

export const Main = styled.div`
    height: 34%;
    width: 90%;

    // border: 1px solid green;
`;

export const Footer = styled.div`
    height: 12%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    & > .label-erro {
        height: 30%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        // border: 1px solid blue;
    }

    & > .button-content {
        height: 62%;
        width: 15%;

        display: flex;
        justify-content: center;
        align-items: center;

        // border: 1px solid blue;
    }

    // border: 1px solid red;
`;


export const InputContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: rgba(30, 30, 30, .5);

    position: fixed;
    top: 0;
    left: 0;

    overflow-y: auto;

    z-index: 999;
    
    overflow: hidden; // evita rolagem na página principal 
`;

export const InputContent = styled.div`
    width: 38%;
    min-width: 550px;
    height: 40%;
    min-height: 350px;
    max-height: 40%;  

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    background-color: rgba(30, 30, 30, 0.95);

    border: 1px solid #c3c3c4;
`;

export const InputHeader = styled.div`
    width: 90%;
    height: 15%;

    display: flex;
    justify-content: right;
    align-items: center;

    & > div {
        height: 35%;
        width: auto;
        aspect-raio: 1/1;

        cursor: pointer;

        & > img {
            height: 100%;
            width: auto;     
            
            cursor: pointer;
        }
    }

    // border: 1px solid red;
`;

export const InputMain = styled.div`
    width: 90%;
    height: 60%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    // border: 1px solid green;
`;

export const MidiaContainer = styled.div`
    height: 15%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-around;

    & > .imgContainer {
        height: 100%;
        width: auto;
        aspect-ratio: 1/1;

        display: flex;
        justify-content: center;
        align-items: center;

        & > img {
            height: 80%;
            width: 80%;
        }
    }

    & > div {
        width: 90%;
        height: 100%;

        & > input {
            width: 90%;
            height: 100%;

            font-size: 1.1rem;
            font-family: Gueda-Bold;

            padding-left: 10px;

            outline: none;
            border: none;

            resize: none;

            color: #c3c4cc;

            background: none;
            border: none;
            border: 1px solid #c3c4cc;
        }
    }

    // border: 1px solid red;
`;

export const InputFooter = styled.div`
    width: 90%;
    height: 25%;

    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        height: 40%;
        width: 20%;
    }

    // border: 1px solid blue;
`;