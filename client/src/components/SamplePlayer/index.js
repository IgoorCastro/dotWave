import React, { useEffect, useRef, useState } from 'react';
import * as C from './styles';
import WaveSurfer from 'wavesurfer.js';
import Axios from 'axios';
import pauseIcon from '../../assets/playerIcons/pause.svg';
import playIcon from '../../assets/playerIcons/play.svg';
import muteIcon from '../../assets/playerIcons/mute.svg';
import volumeOnIcon from '../../assets/playerIcons/volOn.svg';
import { useMainContext } from '../../context/DataContext.js';

const SamplePlayer = ({ musicId }) => {
  const {
    isMusicPlaying,
    toggleIsMusicPlaying,
    toggleIsPlayingSample
  } = useMainContext();

  const [sampleList, setSampleList] = useState([]);
  const waveSurferRefs = useRef([]);
  const [isMutedList, setIsMutedList] = useState([]);
  const [isPlayingList, setIsPlayingList] = useState([]);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);

  const samplesColor = [
    { type: 'Vocal', color: '#FFBE0B' },
    { type: 'Percussão', color: '#FB5607' },
    { type: 'Baixo', color: '#FF006E' },
    { type: 'Synth/ Piano', color: '#0099FF' },
  ];

  useEffect(() => {
    const fetchSampleList = async () => {
      try {
        const response = await Axios.get(`http://localhost:3006/getSampleList`, {
          params: { musicId },
        });
        if (response.data && response.data.length > 0) {
          setSampleList(response.data[0]);
          setIsPlayingList(new Array(response.data.length).fill(false));
          setIsMutedList(new Array(response.data.length).fill(false));
        }
      } catch (error) {
        console.error('Failed to fetch sample list:', error);
      }
    };
    fetchSampleList();
  }, [musicId]);

  const checkSampleColor = (index) => {
    let color = null;
    samplesColor.map(item => { // checar a cor da sample
      if (item.type === sampleList[index].sam_tipo)
        color = item.color;
    });
    return color;
  }

  useEffect(() => {
    if (sampleList.length > 0 && waveSurferRefs.current.length === 0) {
      waveSurferRefs.current = sampleList.map((sample, index) => {
        const waveColor = checkSampleColor(index);
        const waveSurfer = WaveSurfer.create({
          container: `#waveform-${index}`,
          height: 40,
          waveColor: waveColor,
          progressColor: waveColor,
          cursorColor: '#C3C4CC',
          barWidth: 3,
          barHeight: 2,
          barRadius: 20,
          barGap: 1,
        });

        waveSurfer.load(sample.sam_audio);

        waveSurfer.on('ready', () => {
          waveSurfer.setVolume(1);
        });

        waveSurfer.on('finish', () => {
          const updatedIsPlayingList = [...isPlayingList];
          updatedIsPlayingList[index] = false;
          setIsPlayingList(updatedIsPlayingList);
        });

        return waveSurfer;
      });
    }
  }, [sampleList]);

  useEffect(() => {
    if (isMusicPlaying && isPlayingList.includes(true)) {
      waveSurferRefs.current.forEach((waveSurfer, index) => {
        if (waveSurfer && isPlayingList[index]) waveSurfer.pause();
      });
      setIsPlayingList(isPlayingList.map(() => false));
    }
  }, [isMusicPlaying, isPlayingList]);

  const playSample = (index) => {
    if (waveSurferRefs.current[index]) {
      // Pause all other samples if main music is playing
      if (isMusicPlaying) {
        toggleIsMusicPlaying(false);
      }

      // Pause all other samples and set their icons to play
      waveSurferRefs.current.forEach((waveSurfer, idx) => {
        if (waveSurfer && idx !== index && isPlayingList[idx]) {
          waveSurfer.pause();
          setIsPlayingList(prev => {
            const newList = [...prev];
            newList[idx] = false;
            return newList;
          });
        }
      });

      // Toggle current sample
      const updatedIsPlayingList = [...isPlayingList];
      updatedIsPlayingList[index] = !updatedIsPlayingList[index];
      setIsPlayingList(updatedIsPlayingList);

      if (updatedIsPlayingList[index]) {
        waveSurferRefs.current[index].play();
      } else {
        waveSurferRefs.current[index].pause();
      }

      // Update current playing index
      setCurrentPlayingIndex(updatedIsPlayingList[index] ? index : null);

      // Toggle global sample playing state
      toggleIsPlayingSample();
    }
  };

  const toggleMute = (index) => {
    if (waveSurferRefs.current[index]) {
      const updatedIsMutedList = [...isMutedList];
      updatedIsMutedList[index] = !updatedIsMutedList[index];
      setIsMutedList(updatedIsMutedList);

      if (updatedIsMutedList[index]) {
        waveSurferRefs.current[index].setVolume(0);
      } else {
        waveSurferRefs.current[index].setVolume(1);
      }
    }
  };

  return (
    <C.Container>
      {sampleList.map((sample, index) => (
        <C.SamplePlayerContainer key={index}>
          <C.SamplePlayerIconContainer>
            <C.SamplePlayerIcon
              onClick={() => playSample(index)}
              src={currentPlayingIndex === index && isPlayingList[index] ? pauseIcon : playIcon}
            />
          </C.SamplePlayerIconContainer>

          <C.SamplePlayer id={`waveform-${index}`} />

          <C.VolumeBar color={checkSampleColor(index)}>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              onChange={(e) => waveSurferRefs.current[index].setVolume(parseFloat(e.target.value))}
            />
          </C.VolumeBar>

          <C.MuteContainer onClick={() => toggleMute(index)}>
            <C.Mute src={isMutedList[index] ? muteIcon : volumeOnIcon} />
          </C.MuteContainer>
        </C.SamplePlayerContainer>
      ))}
    </C.Container>
  );
};

export default SamplePlayer;
