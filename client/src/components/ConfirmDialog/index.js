import React from 'react';
import * as C from './styles';

import Button from '../Button'
import { useMainContext } from '../../context/DataContext';

const ConfirmDialog = ({ text = 'Defina um texto.', onConfirm }) => {
    const { toggleConfirmDialogVisible } = useMainContext();

    const handleConfirmEvent = () => {
        if (onConfirm) {
            try {
                onConfirm();
                console.log('entrou');
            } catch (er) {
                console.log('\n\n>ConfirmDialog\nerro:', er);
            }
        }
        toggleConfirmDialogVisible();
    };

    const handleCancelEvent = () => toggleConfirmDialogVisible();
    
    return (
        <C.Container>
            <C.Content>
                <C.LabelContent>
                    <h4>atenção</h4>
                    <label>{text}</label>
                </C.LabelContent>
                <C.ButtonContent>
                    <div className='button'  >
                        <Button text='Mudei de ideia' onConfirm={handleCancelEvent} color='#FF3333' />
                    </div>
                    <div className='button' >
                        <Button text='Tenho certeza' onConfirm={handleConfirmEvent} color='#00BF63' />
                    </div>
                </C.ButtonContent>
            </C.Content>
        </C.Container>
    )
}

export default ConfirmDialog