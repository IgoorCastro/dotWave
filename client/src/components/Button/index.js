import React from 'react';
import * as C from './styles'; // ajuste o caminho conforme necessário

const Button = ({ text, onConfirm, color, icon }) => {
    const handleClick = () => {
        if (onConfirm) {
            onConfirm();
        }
    };

    return (
        <C.ButtonContainer onClick={handleClick}>
            <div style={{ border: color ? `2px solid ${color}` : '', color: color || '' }} >
                {!text ? (
                    <img src={icon} alt='' />
                ) : (
                    <label style={{ fontFamily: 'TheBoldFont', cursor: 'pointer' }}>{text}</label>
                )}
            </div>
        </C.ButtonContainer>
    );
};

export default Button;
