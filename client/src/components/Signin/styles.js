import styled, { keyframes } from "styled-components";

const flexCenter = `display: flex;
                    justify-content: center;
                    align-items: center;`

const labelSize = '1.5rem';

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;

    position: fixed;
    top: 0;
    left: 0;

    background: #fff;

    z-index: 900;

    ${flexCenter};
`;

export const LoginContent = styled.div`
    width: 90%;
    height: 99%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;

    // border: 1px solid blue;
`;


export const LoginContentHeader = styled.div`
    position: relative;
    width: 100%;
    height: 8%;


    // border: 1px solid pink;
`;

const fadeInLogo = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const LogoContainer = styled.div`
    position: absolute;
    width: max-content;
    height: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    z-index: 901;
    
    ${flexCenter};

    & > img {
        height: 60px;
        max-height: 70%;
        width: auto;

        cursor: pointer;
        animation: ${fadeInLogo} 2s forwards;
    }
    // border: 1px solid red;
`;
export const ExitContainer = styled.div`
    position: absolute;
    width: 5%; // resto de LogoContainer
    height: 100%;
    right: 0;
    
    ${flexCenter};
    flex-direction: row;

    & > img {
        max-width: 100%;
        max-height: 100%;

        cursor: pointer;
        animation: ${fadeInLogo} 2s forwards;
    }

    // border: 1px solid green;
`;

const slideInMain = keyframes`
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
`;

export const LoginContentMain = styled.div`
    width: 43%;
    height: 50%;

    ${flexCenter};
    flex-direction: column;

    animation: ${slideInMain} 1s forwards; // 1 segundo de animação

    // border: 1px solid blue;
`;

export const Header = styled.div`
    height: 20%;
    width: 100%;

    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;    

    & > .loginContainer {
        width: min-content;
        height: min-content;

        & > h3 {
            font-size: 2.5rem;
            font-family: TheBoldFont;
            text-transform: uppercase;
        }
    }
    // border: 1px solid red;
`;

export const Main = styled.div`
    height: 60%;
    width: 100%;

    ${flexCenter};
    flex-direction: column;

    & > .formContainer {
        height: 100%;
        width: 90%;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    // border: 1px solid red;
`;

export const InputContainer = styled.div`
    width: 100%;
    height: 19%;
    min-height: 45px;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-family: Gueda-Regular;
    ${labelSize};

    & > label {
        text-transform: uppercase;
        max-width: 35%;
    }

    & > input {
        width: 60%;
        max-width: 70%;
        height: 60%;

        font-size: 1.2rem;

        padding: 0 6px;

        outline: none;

        border-radius: .3rem;
        border: 1px solid #1E1E1E;
    }
    // border: 1px solid red;
`;

export const Footer = styled.div`
    height: 20%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;

    & > .confirmButton {
        height: 50%;
        width: 25%;
    }

    & > .labelContent {
        height: 25%;
        width: 100%;

        display: flex;
        justify-content: start;
    }

    // border: 1px solid green;
`;