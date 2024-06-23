import styled, { keyframes } from "styled-components";

export const Container = styled.div`
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

export const Content = styled.div`
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

export const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

export const Loader = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #C3C4CC;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh; // você pode ajustar isso conforme necessário
`;