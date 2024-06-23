import styled from 'styled-components';

export const HomeContainer = styled.div`
    height: 100vh;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const MainSection = styled.div`
    height: 50%;
    width: 95%;

    display: flex;
    justify-content: space-between;
    align-items: end;

    // border: 1px solid red;
`;

export const MainContent = styled.div`
    width: auto;
    height: 95%;
    max-height: 95%;

    z-index: 2;

    display: flex;
    flex-direction: column;

    & > *:first-child {
        margin-top: 2%; 
    }

    // border: 1px solid green;
`;

export const FooterSection = styled.div`
    height: 43%;
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > * {
        margin-bottom: 2%; 
    }

    & > *:first-child {
        margin-left: 2%; 
    }

    & > *:last-child {
        margin-right: 2%; 
    }

    // border: 1px solid red;
`;

export const FooterContent = styled.div`
    width: 15%;
    height: 100%;
    max-height: 100%;

    z-index: 2;

    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;

    // border: 1px solid purple;
`;

export const Link = styled.label`
    text-family: Gueda-Regular;
    text-transform: uppercase;
    font-size: 17px;
    max-width: 100%;
    width: min-content;
    height: 5%;

    ${({ hover }) => hover ? `&:hover{
        font-size: 18px;
    }` : ``}

    margin-bottom: 1px;

    cursor: pointer;

    // border: 1px solid red;
`;

export const Label = styled.label`
    text-family: Gueda-Regular;
    text-transform: uppercase;
    font-size: 16px;

    margin-bottom: 1px;
`;