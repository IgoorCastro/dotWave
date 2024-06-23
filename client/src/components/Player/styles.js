import styled from "styled-components";

export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;    

    //border: 1px solid purple;
`;

export const ButtonContainer = styled.div`
    width: 10%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid red;
`;

export const PlayButton = styled.img`
    height: 34%;
    width: auto;

    cursor: pointer;

    &:hover{
        height: 35%;
    }

    // border: 1px solid red;
`;

export const ProgressBar = styled.div`
    height: 10%;
    width: 80%;

    display: flex;
    justify-content: left;
    align-items: center;

    cursor: pointer;

    border-radius: .5rem;

    background-color: black;

    // border: 1px solid green;
`;

export const Progress = styled.div`
    height: 100%;
    // width: 100%;

    border-radius: .5rem;

    background-color: #c3c4c7;
`;

export const DurantionContainer = styled.div`
    width: 10%;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Durantion = styled.label`
    font-size: .9rem;
`;