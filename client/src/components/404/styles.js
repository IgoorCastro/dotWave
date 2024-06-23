import styled from 'styled-components';

export const Container = styled.div`
    height: 100vh;
    width: 100vw;

    min-height: 630px;
    min-width: 600px;

    display: flex;
    flex-direction: column;
    justify-content: start;

    // overflow: hidden;

    // border: 1px solid green;

    & > label {
        font-family: TheBoldFont, sans-serif;
        text-align: left;
        font-size: 3rem;
    }
`;

