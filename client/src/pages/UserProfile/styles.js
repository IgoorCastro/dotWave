import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;

    min-height: 630px;
    min-width: 600px;

    display: flex;
    flex-direction: column;
    justify-content: start;

    // overflow: hidden;

    // border: 1px solid green;
`;

export const MainContainer = styled.div`
    height: 43%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    // border: 1px solid red;
`;

export const MainContent = styled.div`
    height: 100%;
    width: 80%;

    display: flex;
    flex-direction: row;
    align-items: center;

    // border: 1px solid red;
`;

export const UserProfileContainer = styled.div`
    width: 100%;
    height: 100%;
    min-height: 160px;

    z-index: 1;

    display: flex;
    flex-direction: row;
    align-items: center;
    
    // border: 1px solid red;
`;

export const ProfileImageContent = styled.div`
    height: 190px;
    width: auto;

    aspect-ratio: 1/1;

    display: flex;
    align-items: center;
    justify-content: center;
    // border: 1px solid purple;
`;

export const UserProfileContent = styled.div`
    width: 50%;
    height: 180px;
    min-height: 180px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    // border: 1px solid purple;
`;

export const UserProfileContentName = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;

    // border: 1px solid purple;
`;

export const EditProfileContainer = styled.div`
    height: min-content;
    width: 100%;

    display: flex;
    flex-direction: row;
    jusitfy-content: center;
    align-items: end;

    // border: 1px solid red;
`;

export const EditProfileIcon = styled.img`
    height: 30%;
    width: auto;

    cursor: pointer;

    margin: 0 0 4px 2px;
`;

export const ExbName = styled.label`
    font-family: TheBoldFont, sans-serif;
    font-size: 2.5rem;
    font-weight: 700;

    margin-left: 30px;

    // border: 1px solid red;
`;

export const ConName = styled.label`
    font-family: Gueda-Regular, sans-serif;
    text-transform: uppercase;
    font-size: .95rem;

    margin-left: 30px;

    // border: 1px solid green;
`;

export const UserAboutContent = styled.div`
    width: 60%;
    height: 200px;
    min-height: 200px;

    display: flex;
    flex-direction: column;
    align-items: end;
    justify-content: space-between;

    // border: 1px solid green;
`;

export const CarouselContainer = styled.div`
    height: 50%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid purple;
`;


export const SocialContainer = styled.div`
    width: 25%;
    height: 60%;
    min-width: 140px;

    margin-left: 20px;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: end;

    gap: 0;

    & > div {
        flex: 0 0 30%; // Ajustar a largura dos itens para aproximadamente 1/3 do contêiner
        max-width: 30%; // Limitar a largura máxima dos itens
        height: calc(50% - 2px); 
        
        display: flex;
        justify-content: center;
        align-items: center;
        // border: 1px solid red;
    }

    // border: 1px solid red;
`;

export const UserAboutSection = styled.div`
    height: min-content;
    width: 100%;
    
    display: flex;
    flex-direction: column;
    align-items: end;

    // border: 1px solid green;
`;

export const Label = styled.label`
    text-align: right;
    font-size: .95rem;
`;