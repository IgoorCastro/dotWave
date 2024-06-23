import React, { forwardRef } from "react";
import { CSSTransition } from "react-transition-group";
import styled, { keyframes } from "styled-components";
import InputMask from 'react-input-mask';

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
        width: 40%;
        height: 40%;

        cursor: pointer;
        animation: ${fadeInLogo} 2s forwards;

        // border: 1px solid green
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
    width: 100%;
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

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

    & > .cadastroContainer {
        width: min-content;
        height: min-content;

        & > h3 {
            font-size: 2.5rem;
            font-family: TheBoldFont;
            text-transform: uppercase;
        }
    }

    & > .infoContainer {
        width: 95%;
        height: min-content;

        text-align: center;
        ${labelSize};

        & > label {
            text-transform: uppercase;
            font-family: Gueda-Regular;            
        }      
    }
    // border: 1px solid green;
`;

export const Main = styled.div`
    height: 70%;
    width: 100%;

    ${flexCenter};
    flex-direction: column;

    & > .formContainer {
        height: 95%;
        width: 90%;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        & > .formContent {
            height: 100%;
            width: 100%;
    
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        }        
    }

    & > .formContainer2 {
        height: 100%;
        width: 90%;

        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;

        & > .formContent {
            height: 100%;
            width: 100%;
    
            display: flex;
            flex-direction: column;
            justify-content: start;
            align-items: center;
        } 
        
        // border: 1px solid red;
    }

    & > .errorContainer {
        height: 5%;
        width: 95%; 
        
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;

        & > .chbContainer {
            ${flexCenter};
        }
        & > .chbContainer > label {
            margin-left: 5px;
            font-size: 1rem;
            
            // border: 1px solid red; 
        }
        & > .chbContainer * a {
            text-decoration: none;
            color: inherit;  
        }
    }
    // border: 1px solid red;
`;

export const InputContainer = styled.div`
    width: 100%;
    height: 16.66%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    font-family: Gueda-Regular;
    ${labelSize};

    & > label {
        text-transform: uppercase;
        max-width: 25%;
    }

    & > input {
        width: 70%;
        max-width: 75%;
        height: 35%;

        font-size: 1.2rem;

        padding: 0 6px;

        outline: none;

        border-radius: .3rem;
        border: 1px solid #1E1E1E;
    }
    // border: 1px solid red;
`;

export const MusicCover= styled.div`
    position: relative;
    width: 27%;
    height: auto;
    
    
    aspect-ratio: 1/1;

    margin-top: 5%;
    
    display: flex;
    justify-content: center;
    align-items: center;   

    cursor: pointer;

    background: rgba(30, 30, 30, .3);

    border: 2px solid #c3c4cc;

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
        width: 29%;          
        height: auto;
    }

    ${({ checkImg }) => !checkImg ? `
            &:hover{
                & > img {
                    width: 27%; 
                }
            }
        ` : ``};


    // border: 2px solid #f4f7ff;
`;

export const ProfileImg = styled.img`
    height: 100%;
    min-width: 100%;
    width: auto;    

    border-radius: 1.2rem;

    border: 2px solid #1E1E1E;
`;

export const Footer = styled.div`
    height: 10%;
    width: 90%;

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: end;

    & > .errorContainer {
        height: 30%;
        width: 100%;

        ${flexCenter};

        // border: 1px solid red;

        & > label {
            min-width: 100%;
            text-align: center;
            color: #1E1E1E;
            background: rgba(255, 51, 51, .35);
            borderRadius: .2rem;

            // border: 1px solid red;
        }
    }

    & > .confirmButton {
        height: 70%;
        width: 25%;

        ${flexCenter};

        border-radius: .3rem;
        border: 2px solid #FB5607;

        cursor: pointer;

        &:hover {
            background: rgba(255, 87, 51, .05);
        }

        & > label {
            color: #FB5607;
            text-transform: uppercase;
            font-family: TheBoldFont;
            cursor: pointer;
        }
    }

    // border: 1px solid green;
`;

// Componente que envolve a transição com forwardRef
export const TransitionWrapper = React.forwardRef((props, ref) => (
    <CSSTransition {...props} nodeRef={ref}>
      <div ref={ref}>{props.children}</div>
    </CSSTransition>
));

export const InputMaskWrapper = forwardRef((props, ref) => (
  <InputMask {...props} inputRef={ref} />
));