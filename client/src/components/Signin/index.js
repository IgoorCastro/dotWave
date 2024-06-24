import React, { useState, useEffect, useRef } from 'react';
import * as C from './styles';
import axios from 'axios';
import Button from '../Button';
import logo from '../../assets/waveTextBlack.svg';
import exitIconBlack from '../../assets/exitIconBlack.svg';
import { useMainContext } from '../../context/DataContext';
import { useAuthContext } from '../../context/AuthContext';

const Signin = () => {
    const { toggleIsLoginVisible } = useMainContext();
    const { login } = useAuthContext();
    const [labelErro, setLabelErro] = useState(null);
    const [loginForm, setLoginForm] = useState({
        nomeUsuario: '',
        senha: ''
    });
    const [countPasswordAttempts, setCountPasswordAttempts] = useState(0);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [remainingTime, setRemainingTime] = useState(0);
    const timerRef = useRef(null);

    const isFormComplete = (form) => {
        return Object.values(form).every(value => value.trim() !== '');          
    };

    const handleConfirmButton = async () => {
        if (isFormComplete(loginForm)) {
            try {            
                await axios.post('http://localhost:3006/signin', {
                    nomeUsuario: loginForm.nomeUsuario,
                    senha: loginForm.senha // back end ira trabalhar a criptografia
                }).then((response) => {
                    if (response.status === 200) {
                        login(response.data.token, response.data.usuario); 
                        toggleIsLoginVisible();
                        alert(response.data.message);
                    }
                });
            } catch (erro) {
                if (erro.response && erro.response.status === 401) { // caso o usuario nao seja encontrado
                    setLabelErro(erro.response.data.message);
                    incrementPasswordAttempt();
                } else {
                    alert('Erro no servidor. Tente novamente mais tarde,');
                    console.log('(handleConfirmButton) >> Erro: ', erro);
                }
            }
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleConfirmButton();
        }
    };

    const handleChangeValues = (event) => {
        const { name, value } = event.target;        
        setLoginForm(prevValues => ({
            ...prevValues,
            [name]: value
        }));
        setLabelErro(null);
    };

    const handleLoginVisible = () => {
        toggleIsLoginVisible();
    };

    const incrementPasswordAttempt = () => {
        setCountPasswordAttempts(prevAttempts => prevAttempts + 1);
    };

    useEffect(() => {
        if (countPasswordAttempts >= 6) {
            setLabelErro(null);
            setIsButtonDisabled(true);
            setRemainingTime(60); // Tempo em segundos
            timerRef.current = setTimeout(() => {
                setIsButtonDisabled(false);
                setCountPasswordAttempts(0);
                setRemainingTime(0);
            }, 60000);

            return () => {
                clearTimeout(timerRef.current);
            };
        }
    }, [countPasswordAttempts]);

    useEffect(() => {
        if (remainingTime > 0 && isButtonDisabled) {
            const timer = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [remainingTime, isButtonDisabled]);

    return (
        <C.LoginContainer>
            <C.LoginContent>
                <C.LoginContentHeader>
                    <C.LogoContainer>
                        <img src={logo} alt='' />
                    </C.LogoContainer>
                    <C.ExitContainer>
                        <img src={exitIconBlack} alt='' onClick={handleLoginVisible} />
                    </C.ExitContainer>
                </C.LoginContentHeader>

                <C.LoginContentMain>
                    <C.Header>
                        <div className='loginContainer'>
                            <h3>Login</h3>
                        </div>
                    </C.Header>

                    <C.Main>
                        <div className='formContainer'>
                            <C.InputContainer>
                                <label>NOME DE USUÁRIO OU EMAIL:</label>
                                <input type='text' name='nomeUsuario' onChange={handleChangeValues} />
                            </C.InputContainer>
                            <C.InputContainer>
                                <label>Senha:</label>
                                <input type='password' name='senha' onChange={handleChangeValues} onKeyDown={handleKeyDown} />
                            </C.InputContainer>
                        </div>
                    </C.Main>
                    <C.Footer>
                        <div className='labelContent'>
                            {labelErro && (
                                <label style={{ fontSize: '1.2rem', textAlign: 'center', color: '#1E1E1E', background: 'rgba(255, 51, 51, .15)', borderRadius: '.2rem', width: '100%' }}>{labelErro}</label>
                            )}
                            {isButtonDisabled && remainingTime > 0 && (
                                <label style={{ fontSize: '1.2rem', textAlign: 'center', color: '#1E1E1E', background: 'rgba(255, 51, 51, .15)', borderRadius: '.2rem', width: '100%' }}>Você excedeu o número de tentativas. Tente novamente em {remainingTime} segundos.</label>
                            )}
                        </div>
                        <div className='confirmButton' onClick={handleConfirmButton}>
                            <Button text='Entrar' color='#FB5607' disabled={isButtonDisabled} />
                        </div>
                    </C.Footer>
                </C.LoginContentMain>
            </C.LoginContent>
        </C.LoginContainer>
    );
};

export default Signin;
