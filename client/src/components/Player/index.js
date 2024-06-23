import React, { useEffect, useRef, useState } from 'react';
import * as C from './styles';
import { useMainContext } from '../../context/DataContext.js';
import pauseIcon from '../../assets/playerIcons/pause.svg';
import playIcon from '../../assets/playerIcons/play.svg';

const Player = ({ music }) => {      
    const [isPlaying, setIsPlaying] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef(null);
    const progressBarRef = useRef(null);

    const { isPlayingSample, toggleIsMusicPlaying } = useMainContext();    

    useEffect(() => {
        const progressBar = progressBarRef.current;
        const handleProgressClick = (e) => {
            const clickedPosition = e.clientX - progressBar.getBoundingClientRect().left;
            const progressBarWidth = progressBar.offsetWidth;
            const newTime = (clickedPosition / progressBarWidth) * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
            audioRef.current.play();
        };

        if (progressBar) {
            progressBar.addEventListener('click', handleProgressClick);
            return () => {
                progressBar.removeEventListener('click', handleProgressClick);
            };
        }        
    }, [audioRef, progressBarRef, duration]);    

    useEffect(() => {
        // console.log('\n(Player) >> Effect\n\n');
        if (!isPlayingSample) {   
            // console.log('\n(Player) >>isPlayingSample\n');         
            if(isPlaying){
                // console.log('\n(Player) >>isPlaying\n');
                audioRef.current.pause();
                setIsPlaying(!isPlaying);
            }
        }
    }, [isPlayingSample]);

    const playPause = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
        toggleIsMusicPlaying(!isPlaying);
    }
    

    const handlePlay = () => {
        if (!isPlaying) {
            setCurrentTime(audioRef.current.currentTime);
        }
    }

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    return (
        <C.Container>
            <audio 
                ref={audioRef} 
                src={music} 
                type="audio/mpeg"
                onLoadedMetadata={() => setDuration(audioRef.current.duration)}
                onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
                onPlay={handlePlay}
            />

            <C.ButtonContainer>
                <C.PlayButton src={isPlaying ? pauseIcon : playIcon} onClick={playPause} />
            </C.ButtonContainer>

            <C.ProgressBar ref={progressBarRef}>
                <C.Progress style={{ width: `${(currentTime / duration) * 100}%` }} />
            </C.ProgressBar>

            <C.DurantionContainer>
                <C.Durantion>{formatTime(currentTime)}</C.Durantion>
            </C.DurantionContainer>
        </C.Container>
    );
};

export default Player;