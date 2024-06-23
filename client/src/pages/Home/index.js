import React, { useEffect, useState } from 'react';
import * as C from './styles';

import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import NavBar from '../../components/NavBar';
import Signin from '../../components/Signin';
import Signup from '../../components/Signup';
import AnimateBackground from '../../components/AnimatedBackground2';
import Axios from 'axios';

const Home = () => {
    const { isLoginVisible, toggleIsLoginVisible, toggleIsCadastroVisible, isCadastroVisible } = useMainContext();
    const { user, setUser } = useAuthContext();
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    const dotWave = {
        endereco: 'Rua da Consolação, São Paulo - SP, 01302-000',
        telefone: '(47) 9 6482-4433',
        email: 'contato@dotwave.com'
    }
    
    useEffect(() => {
        const fetchUserData = async () => {
            if(user){
                try {
                    const response = await Axios.get("http://localhost:3006/getUser", { // busca pelo usuario pesquisado
                        params: {
                            username: user[0].usu_nomeExb
                        }
                    });
                    console.log('response.data\n', response.data);
                    if (response.data)
                        setUser(response.data);
    
                } catch (er) {
                    console.error('\n(Home) >>Erro em fetchUserData\n\n-->Erro: ', er);
                }
            }
        }

        fetchUserData();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleLoginVisible = () => {
        toggleIsLoginVisible();
    }
    const handleCadastroVisible = () => {
        toggleIsCadastroVisible();
    }
    
    const handleMinhaConta = () => {
        const link = '/' + user[0].usu_nomeExb;
        console.log('link: ', link);
        navigate(link);
    };

    return (
        <C.HomeContainer>
            <AnimateBackground />

            <NavBar /> {/* Passe o usuário atualizado para o NavBar */}


            {isLoginVisible && (
                <Signin />
            )}

            {isCadastroVisible && (
                <Signup />
            )}


            <C.MainSection>
                <C.MainContent>
                    <C.Link hover="true" onClick={() => alert("Fórum")}>Fórum</C.Link>
                    <C.Link hover="true" onClick={() => alert("Blog")}>Blog</C.Link>
                    <C.Link hover="true" onClick={() => alert("Atualizações")}>Atualizações</C.Link>
                </C.MainContent>
                {!user && (
                    <C.MainContent style={{ width: '10%', alignItems: 'end'}}>
                        <C.Link hover="true" onClick={handleLoginVisible}>Login</C.Link>
                        <C.Link hover="true" onClick={handleCadastroVisible}>Cadastro</C.Link>
                    </C.MainContent>
                )}
            </C.MainSection>

            <C.FooterSection>
                <C.FooterContent>
                    <C.Label>
                        {dotWave.endereco}
                    </C.Label>
                    <C.Label>
                        {dotWave.telefone}
                    </C.Label>
                    <C.Label>
                        {dotWave.email}
                    </C.Label>
                </C.FooterContent>

                <C.FooterContent>
                    <C.Link hover="false" style={{width: 'max-content'}}>Sobre nós</C.Link>
                    <C.Link hover="false" style={{width: 'max-content'}}>Fale conosco</C.Link>
                    <C.Link hover="false" style={{width: 'max-content'}}>Politicas de privacidade</C.Link>
                </C.FooterContent>

                <C.FooterContent>
                    <C.Link hover="false">Facebook</C.Link>
                    <C.Link hover="false">x</C.Link>
                    <C.Link hover="false">Instagram</C.Link>
                    <C.Link hover="false">Youtube</C.Link>
                    <C.Link hover="false">Tiktok</C.Link>
                </C.FooterContent>

                <C.FooterContent>
                    <C.Link hover="false">Painel</C.Link>
                    <C.Link hover="false" style={{width: 'max-content'}} onClick={handleMinhaConta}>Minha conta</C.Link>
                </C.FooterContent>
            </C.FooterSection>
        </C.HomeContainer>
    )
}

export default Home;
