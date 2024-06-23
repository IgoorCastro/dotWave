import styled from "styled-components";

export const CarouselContainer = styled.div`
    width: 80%;
    height: 100%;
    min-height: 250px;
    min-width: 600px;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    border-radius: .5rem;

    z-index: 998;

    // border: 1px solid blue;
`;

export const CenterItemContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;

    justify-content: center;
    align-items: center;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    // border: 1px solid red;
`;

export const SecondaryItemContainer = styled.div`
    width: 10%;
    height: 100%;
    display: flex;

    justify-content: center;
    align-items: center;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    
    // border: 1px solid blue;
`;

// export const TertiaryItemContainer = styled.div`
//     width: 5%;
//     height: 100%;
//     display: flex;

//     justify-content: center;
//     align-items: center;

//     overflow: hidden;
//     white-space: nowrap;
//     text-overflow: ellipsis;
    
//     // border: 1px solid green;
// `;
