import styled from "styled-components";

export const Container = styled.div`
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

export const Content = styled.div`
    width: 20%;
    min-width: 300px;
    height: 16%;
    min-height: 50px;
    max-height: 16%;  

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    background-color: rgba(30, 30, 30, 0.95);

    border: 1px solid #c3c3c4;
`;

export const LabelContent = styled.div`
    width: 89%;
    height: 55%;

    display: flex;
    flex-direction: column;
    gap: .5rem;

    & > h4 {
        color: #c3c4cc;
        font-size: 1.2rem;
        text-align: center;
        
        margin-top: 2%;

        text-transform: uppercase;
    }

    & > label {
        color: #c3c4cc;
        text-align: center;
    }

    // border: 1px solid red;
`;

export const ButtonContent = styled.div`
    width: 90%;
    height: 45%; 
    
    display: flex;
    justify-content: space-between;
    align-items: center;

    & > .button {
        width: 39%;
        height: 64%;

        text-align: center;
        font-size: .9rem;
    }

    // border: 1px solid red;
`;