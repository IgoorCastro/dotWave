import React, { useEffect, useState } from 'react';
import * as C from './styles';
import TrackCard from '../TrackCardNew';

import { useMainContext } from '../../context/DataContext';

const SliderItemSecondary = ({ items, position }) => {
    const { currentItemIndex } = useMainContext();
    const [slider, setSlider] = useState({});

    // index de exibição atual: currentItemIndex - 1 ou currentItemIndex + 1

    useEffect(() => {
        if (Array.isArray(items) && items.length > 0) {
            position === 'left' ? setSlider(items[currentItemIndex - 1]) : setSlider(items[currentItemIndex + 1]);
        }
    }, [currentItemIndex]);
    
    return (
        <C.SliderCenterContent>

            <C.SliderItemContainer position={position} >
                <TrackCard props={slider}  />
            </C.SliderItemContainer>

        </C.SliderCenterContent>

    )
}

export default SliderItemSecondary
