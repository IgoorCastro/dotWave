import styled from "styled-components";

export const HeaderContainer = styled.div`
    height: 7%;
    min-height: 40px; 
    width: 100%;

    display: flex;
    flex-direction: row;
    justify-content: center;

    background-color: #1E1E1E;

    // border: 1px solid black;
`;

export const HeaderContent = styled.div`
    height: 100%;
    width: 90%;

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    z-index: 200;

    color: #fff;

    // border: 1px solid red;
`;

export const HeaderLogoContent = styled.div`
    width: 33.333%;
    height: 100%;

    display: flex;
    justify-content: start;
    align-items: center;

    // border: 1px solid green;
`;

export const HeaderLogo = styled.img`
    position: relative;

    height: 100%;
    width: auto;
    
    cursor: pointer;

    // border: 1px solid green;
`;

export const HeaderSearchContent = styled.div`
    position: relative;
    height: 45%;
    width: 33.333%;

    
    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid red;
`;

export const SearchInput = styled.input`
    height: 100%;
    width: 77%;

    display: flex;
    align-items: center;

    background-color: #1E1E1E;
    color: #F4F7FF;
    padding-left: 7px;
    
    border: 1px solid #F4F7FF;
    border-radius: .5rem;

    &:focus {
        outline: none; /* Remove o contorno padrão quando o input está em foco */
        box-shadow: 0 0 0 0 transparent; /* Remove o efeito de sombra quando o input está em foco */
    }
`;

export const UserMenuContainer = styled.div`
    position: relative;
    width: 33.333%;
    min-width: min-content;
    height: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    & > img{
        height: 35%;
        width: auto;

        margin-right: 8%;

        cursor: pointer;
    }

    // border: 1px solid white;
`;

export const UserMenu = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    max-height: 100%;

    display: flex;
    justify-content: end;
    align-items: center;

    border-radius: 50%;

    cursor: pointer;

    border: 1px solid green;
`;