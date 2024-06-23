import React, { useEffect, useState } from 'react';
import * as C from './styles';
import TrackCard from '../TrackCardNew';
import PrevButtonIcon from '../../assets/prevsButton.svg';
import NextButtonIcon from '../../assets/nextButton.svg';
import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

const SliderItemCenter = ({ items }) => {
    const { setCurrentItemIndex } = useMainContext();
    const { user } = useAuthContext();
    const [slider, setSlider] = useState(items[0]);
    const [currentIndexSlider, setCurrentIndexSlider] = useState();

    useEffect(() => {
        const fetchItems = () => {
            if (Array.isArray(items) && items.length > 0) {
                if (items.length === 1) {
                    
                    setSlider(items[0]);
                    setCurrentIndexSlider(0);
                    setCurrentItemIndex(0);
                } else {
                    setSlider(items[1]);
                    setCurrentIndexSlider(1);
                    setCurrentItemIndex(1);
                }
            }
        }

        fetchItems();
    }, [user]);

    const handlePrevSlider = () => {
        setSlider(items[currentIndexSlider - 1]);
        setCurrentIndexSlider(currentIndexSlider - 1); // item apresentado no slider
        setCurrentItemIndex(currentIndexSlider - 1); // index do item no card central

    }
    
    const handleNextSlider = () => {
        setSlider(items[currentIndexSlider + 1]);
        setCurrentIndexSlider(currentIndexSlider + 1);
        setCurrentItemIndex(currentIndexSlider + 1);
    }

    return (
        <C.SliderCenterContent>

            {currentIndexSlider > 0 && (
                <C.SliderButtonContainer onClick={handlePrevSlider} >
                    <C.SliderButton icon={PrevButtonIcon} />
                </C.SliderButtonContainer>
            )}

            <C.SliderItemContainer >
                <TrackCard props={slider} showTitle={true}  />
            </C.SliderItemContainer>

            {currentIndexSlider < items.length - 1 && (
                <C.SliderButtonContainer onClick={handleNextSlider} >
                    <C.SliderButton icon={NextButtonIcon} position='right' />
                </C.SliderButtonContainer>
            )}

        </C.SliderCenterContent>

    )
}

export default SliderItemCenter
