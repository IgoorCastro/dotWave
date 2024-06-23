import styled from "styled-components";

export const Container = styled.div`    
    position: relative;
    height: 90%;
    width: 100%;
    
    z-index: 998;

    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;

    gap: .3rem;

    &:hover .icon-container {
        opacity: 1;
    }

    // border: 1px solid green;
`;

export const IconContainer = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    gap: 10px;
    opacity: 0;
    transition: opacity 0.3s;

    border-radius: .5rem;

    padding: 6px;
    background: rgba(195,196,204, .1);
`;

export const Icon = styled.img`
    width: 20px;
    height: 20px;
    cursor: pointer;

    transition: width 0.3s, height 0.3s;

    &:hover {
        width: 22px;
        height: 22px;
    }
`;

export const CardContent = styled.div`
    width: 100%;
    height: 85%;

    position: relative;

    display: flex;
    justify-content: center; 
    align-items: center; 

    border-radius: 1rem;

    // border: 2px solid red;
`;

export const CardBackImg = styled.img`
    height: 100%;    
    width: auto;
    max-width: 100%;
    
    object-fit: cover;

    border-radius: 1rem;

    // border: 1px solid red;

    cursor: pointer;

    filter: blur(2px);

    // border: 2px solid red;
`;

export const CardImgContent = styled.div`
    position: absolute; /* Define uma posição absoluta */
    top: 50%; /* Coloca o elemento no meio verticalmente */
    left: 50%; /* Coloca o elemento no meio horizontalmente */
    transform: translate(-50%, -50%); /* Move o elemento de volta para ajustar ao centro */
    
    // width: 7.5rem;
    // height: 7.5rem;

    width: 55%;
    height: 40%;
    
    display: flex;

    border-radius: 14px;

    // border: 1px solid #F4F7FF;

    transition: width 0.3s ease, height 0.3s ease;
    &:hover{
        width: 56%;
        height: 41%;
    }

    cursor: pointer;
`;

export const CardImg = styled.img` 
    width: 100%;
    height: auto;

    border-radius: 14px;

    box-shadow: 6px 10px 3px -3px rgba(0,0,0,0.4);
`;

export const CardTitle = styled.label`
    width: 100%;
    white-space: nowrap; 
    overflow: hidden; 
    text-overflow: ellipsis; 
    text-align: center;

    text-transform: uppercase;

    font-size: 1.05rem;
    
    // border: 1px solid red;
`;