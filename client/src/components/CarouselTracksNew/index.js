import React, { useEffect } from 'react';
import * as C from './styles';
import SliderItemCenter from '../SliderItemCenter';
import SliderItemSecondary from '../SliderItemSecondary';
import { useMainContext } from '../../context/DataContext';


const CarouselFaixas = ({ items }) => {
    const { setCurrentItemIndex, currentItemIndex } = useMainContext();
    
    useEffect(() => {
        if (Array.isArray(items) && items.length > 0) {
            if (items.length === 1) {
                setCurrentItemIndex(0);
            } else {
                setCurrentItemIndex(1);
            }
        }
    }, [items]);
    
    return (
        <C.CarouselContainer>
            {/* <C.TertiaryItemContainer>
                Terceiro
            </C.TertiaryItemContainer> */}

            <C.SecondaryItemContainer>
                {currentItemIndex > 0 && (
                    <SliderItemSecondary items={items} position='left' />
                )}
            </C.SecondaryItemContainer>

            <C.CenterItemContainer>
                <SliderItemCenter items={items} />
            </C.CenterItemContainer>


            <C.SecondaryItemContainer>
                {currentItemIndex < items.length - 1 && (
                    <SliderItemSecondary items={items} />
                )}
            </C.SecondaryItemContainer>

            {/* <C.TertiaryItemContainer>
                Terceiro
            </C.TertiaryItemContainer> */}
        </C.CarouselContainer>
    );
};

export default CarouselFaixas
