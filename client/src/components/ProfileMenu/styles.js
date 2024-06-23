import styled from "styled-components";

export const UserMenuContainer = styled.div`
    position: relative;
    height: 65%;
    width: auto;
    
    aspect-ratio: 1/1;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: 50%;

    cursor: pointer;

    border: 2px solid #F4F7FF;
`;

export const UserMenuImg = styled.img`
    height: 100%;

    border-radius: 50%;
`;

export const UserDropMenuContainer = styled.div`
    position: absolute;
    top: calc(100% + 7px); 
    right: 0;
    
    z-index: 999; 

    width: 180px;
    height: 140px;

    display: flex;
    justify-content: center;
    align-items: center;

    cursor: default;

    background-color: #1E1E1E; 
    border-radius: 0 0 .5rem .5rem;

    // border: 1px solid #F4F7FF;
`;

export const UserDropMenuContent = styled.div`
    width: 80%;
    height: 80%;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;

    // border: 1px solid red;
`;

export const UserDropMenuLine = styled.div`
    width: 100%;
    height: 33.333%;

    display: flex;
    flex-direction: row;
    ${({ position }) => position === 'center' ? `justify-content: center;` : `justify-content: start;`}
    align-items: center;

    cursor: pointer;

    border-radius: .4rem;

    &:hover {
        background-color: rgba(240, 240, 240, 0.1);
    }
    

    // border: 1px solid green;
`;

export const UserDropMenuIconContainer = styled.div`
    width: 26%;
    height: 80%;

    display: flex;
    justify-content: center;
    align-items: center;

    // border: 1px solid white;
`;

export const UserDropMenuIcon = styled.img`
    height: 100%;
    width: auto;

    display: flex;
    justify-content: center;
    align-items: center

    // border: 1px solid white;
`;

export const UserDropMenuLabel = styled.label`
    margin-left: 1%;

    cursor: pointer;

    font-family: Gueda-Regular;
    color: #FFF;
`;