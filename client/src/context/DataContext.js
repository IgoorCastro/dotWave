import React, { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const useMainContext = () => {
    return useContext(DataContext);
};

// DataContext.js

export const DataProvider = ({ children }) => {
    const [isMusicPlayerVisible, setMusicPlayerVisible] = useState(false);
    const [isProfileEditVisible, setProfileEditVisible] = useState(false);
    const [isAddMusicVisible, setAddMusicVisible] = useState(false);
    const [isEditMusicVisible, setEditMusicVisible] = useState(false);
    const [isPlayingSample, setIsPlayingSample] = useState(false);
    const [isMusicPlaying, setIsMusicPlaying] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isCadastroVisible, setIsCadastroVisible] = useState(false);
    const [isConfirmDialogVisible, setIsConfirmDialogVisible] = useState(false);
    const [userProfileUpdate, setUserProfileUpdate] = useState(false);

    const [currentItemIndex, setCurrentItemIndex] = useState(null);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [isAnyAudioPlaying, setIsAnyAudioPlaying] = useState(false);

    const toggleMusicPlayerVisible = () => setMusicPlayerVisible(prev => !prev);
    const toggleProfileEditVisible = () => setProfileEditVisible(prev => !prev);
    const toggleAddMusicVisible = () => setAddMusicVisible(prev => !prev);
    const toggleEditMusicVisible = () => setEditMusicVisible(prev => !prev);
    const toggleIsPlayingSample = () => setIsPlayingSample(prev => !prev);
    const toggleIsMusicPlaying = (isPlaying) => {
        setIsMusicPlaying(isPlaying);
        setIsAnyAudioPlaying(isPlaying);
    };
    const toggleIsLoginVisible = () => setIsLoginVisible(prev => !prev);
    const toggleIsCadastroVisible = () => setIsCadastroVisible(prev => !prev);
    const toggleUserProfileUpdate = () => setUserProfileUpdate(!userProfileUpdate);
    const toggleConfirmDialogVisible = () => setIsConfirmDialogVisible(prev => !prev);

    return (
        <DataContext.Provider value={{
            currentItemIndex, setCurrentItemIndex,
            isMusicPlayerVisible, toggleMusicPlayerVisible,
            isProfileEditVisible, toggleProfileEditVisible,
            isAddMusicVisible, toggleAddMusicVisible,
            isEditMusicVisible, toggleEditMusicVisible,
            isPlayingSample, toggleIsPlayingSample,
            isMusicPlaying, toggleIsMusicPlaying,
            isLoginVisible, toggleIsLoginVisible,
            isCadastroVisible, toggleIsCadastroVisible,
            selectedMusic, setSelectedMusic,
            userProfileUpdate, toggleUserProfileUpdate,
            isConfirmDialogVisible, toggleConfirmDialogVisible,
            isAnyAudioPlaying
        }}>
            {children}
        </DataContext.Provider>
    );
};
