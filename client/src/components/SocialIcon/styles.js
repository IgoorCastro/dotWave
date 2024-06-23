import styled from "styled-components";

export const SocialIconContainer = styled.div`
    position: relative;
    height: 80%;
    width: auto;
    aspect-ratio: 1/1;
    // min-width: 32px;
    // min-height: 32px;

    display: flex;
    justify-content: center;
    align-items: center;

    border-radius: .5rem;

    cursor: pointer;

    & > img {
        width: 60%;
        height: 60%;

        cursor: pointer;

        // border: 1px solid red;
    }

    border: 1px solid ${({ borderColor }) => borderColor ? `${borderColor}` : '#F4F7FF'}; 
`;
