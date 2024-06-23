import styled from "styled-components";

export const ButtonContainer = styled.div`
    height: 100%;
    max-height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: start;

    cursor: pointer;

    & > div {
        height: 100%;
        width: 100%;

        display: flex;
        justify-content: center;
        align-items: center;

        border-radius: .2rem;

        cursor: pointer;

        border: 2px solid #c3c3c4;

        

        &:hover{
            background: rgba(0, 191, 99, 0.02);
        }

        & > img {
            height: 40%;
            width: auto;
        }
    }

    // border: 1px solid blue;
`;