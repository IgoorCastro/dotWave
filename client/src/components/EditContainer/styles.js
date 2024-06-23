import styled from "styled-components";

export const EditContainer = styled.div`
    position: absolute;
    
    height: 100%;
    width: auto;
    aspect-ratio: 1/1;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    opacity: 0;

    border-radius: ${({ borderRadius }) => borderRadius};

    &:hover{
        opacity: .8;
    }

    & > img {
        height: 30%;
        width: auto;

        border-radius: ${({ borderRadius }) => borderRadius};

        // border: 1px solid #c3c4cc;
    }
    border: 2px solid #c3c4cc;
`;