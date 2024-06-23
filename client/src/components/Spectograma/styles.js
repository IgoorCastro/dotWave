import styled from 'styled-components';

export const Container = styled.div`
    width: 100vw;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const Canvas = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: url(https://jakeactually.com/codepen/spectrogram/backup.png);
    background-position: center;
    background-size: cover;
`;

export const Audio = styled.audio`

`;

export const Form = styled.form`
    display: block;
`;

export const Label = styled.label`
    position:absolute; 
    top:0; 
    left:0; 
    right:0; 
    bottom:0; 
    width:40px; 
    height:40px; 
    margin:auto; 
    border:solid 2px #00ff55; 
    border-radius:50%; 
    cursor:pointer;
`;

export const Input = styled.input``;

export const Image = styled.img`
    height:25px; 
    margin:7px 6px;
`;
