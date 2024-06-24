import React, { useRef, useState } from 'react';
import * as C from './styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Axios from 'axios';

import logo from '../../assets/waveTextBlack.svg';
import uploadIcon from '../../assets/uploadIcon.svg';
import exitIconBlack from '../../assets/exitIconBlack.svg';
import { useMainContext } from '../../context/DataContext';

import ConfirmDialog from '../ConfirmDialog';

const Signup = () => {
  const zxcvbn = require('zxcvbn');
  const { toggleIsCadastroVisible, toggleConfirmDialogVisible, isConfirmDialogVisible } = useMainContext();
  const cbxPoliticaRef = useRef(null);
  const cbxTermosRef = useRef(null);
  const form1Ref = useRef(null);
  const form2Ref = useRef(null);
  const [checkImage, setCheckImage] = useState(false); // estado para controlar o hover da input
  const [nextForm, setNextForm] = useState(false);
  const [labelErro, setLabelErro] = useState(null);
  const [userImg, setUserImg] = useState(null);
  const [passwordScoreConfig, setPasswordScoreConfig] = useState({
    color: 'transparent',
    width: ''
  }); // Estado para armazenar as config da senha
  const [passwordScore, setPasswordScore] = useState(0);
  // const [passwordColor, setPasswordColor] = useState('trasnparent');
  const [cadastroForm, setCadastroForm] = useState({
    nome: '',   // Brendan 
    sobrenome: '', // Halabi
    nomeDeUsuario: '', //@melad_music
    nomeDeExibicao: '', //melad
    imagem: '', // arquivo de imagem
    telefone: '', // (12)99631 4565
    email: '', // music.melad@gmail.com
    senha: '' // *********
  });

  const handleConfirmButton = async () => {
    if (isFormComplete(cadastroForm)) {
      try {
        const nomeExbTest = await Axios.get("http://localhost:3006/exbNameTest", { // checar se  o nome de exibição está livre
          params: {
            exbName: cadastroForm.nomeDeExibicao
          }
        });
        if (nomeExbTest.data) { // verifica se a resposta do server é true
          console.log('Nome de exibição já cadastrado');
          setLabelErro('Nome de exibição já cadastrado');
          return;
        }
      } catch (er) {
        console.error('\n\n>Erro ao testar o nome de exibição\n-->Erro: ', er);
      }      

      try {
        const formData = new FormData();
        for (const key in cadastroForm) {
          if (cadastroForm[key] instanceof File) {
            formData.append(key, cadastroForm[key]);
          } else if (Array.isArray(cadastroForm[key])) {
            cadastroForm[key].forEach(file => {
              formData.append(key, file);
            });

          } else {
            formData.append(key, cadastroForm[key]);
          }
        }

        const result = await Axios.post('http://localhost:3006/signup', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert('Usuario cadastrado com sucesso!');
        toggleIsCadastroVisible();
      } catch (error) {
        setLabelErro('Erro ao enviar solicitação de cadastro:', error);
      }
    } else {
      setLabelErro('Preencha todos os campos');
    }
  };

  const isFormComplete = (form) => {
    let rest = null;

    // Caso esteja no primeiro form
    if (!nextForm) {
        const { imagem, nomeDeExibicao, ...others } = form; // Removendo a verificação de imagem e nomeDeExibicao com rest operation
        rest = others;
    } else 
        rest = form;
    

    // Verificando se todos os valores são preenchidos e são strings (exceto 'imagem' que pode ser um objeto File)
    return Object.values(rest).every(value => {
        if (typeof value === 'string') 
            return value.trim() !== '';
        else if (value instanceof File) 
            return true; // Arquivo válido
        else 
            return false; // Outros tipos não são válidos (como objetos)        
    });
};

  const handleCadastroVisible = () => {
    toggleIsCadastroVisible();
  }

  const handleNextForm = async () => {
    console.log(passwordScoreConfig);
    if(passwordScore > 2){
      try{
        const usernameTest = await Axios.get("http://localhost:3006/usernameTest", {
          params: {
            username: cadastroForm.nomeDeUsuario
          }
        });
    
        if (usernameTest.data) {
          setLabelErro('Nome de usuário já cadastrado');
          return;
        }
      }catch(er){
        console.error('\n\n>Erro ao testar o nome de usuario\n-->Erro: ', er)
      }
  
      try {
        const phoneNumberTest = await Axios.get("http://localhost:3006/phoneNumberTest", { // checar se  o numero de telefone está livre
          params: {
            phoneNumber: cadastroForm.telefone
          }
        });
        if (phoneNumberTest.data) { // verifica se a resposta do server é true
          setLabelErro('Telefone já cadastrado');
          return;
        }
      } catch (er) {
        console.error('\n\n>Erro ao testar o número de telefone\n-->Erro: ', er);
      }
  
      if (cbxPoliticaRef.current.checked && cbxTermosRef.current.checked) {
        if (isFormComplete(cadastroForm))
          setNextForm(!nextForm)
        else
          setLabelErro('Preencha todos os campos');
      } else
        setLabelErro('Leia e concorde com os termos e políticas');
    }else {
      setLabelErro('Sua senha deve ser forte');
    }
      
  }

  const handleChangeValues = (event) => {
    const { name, value } = event.target;
    // console.log('cadastroForm: \n', cadastroForm);
    setCadastroForm(prevValues => ({
      ...prevValues,
      [name]: value,
    }));
    setLabelErro(null);

    if (name === 'senha') { // Verificar se a senha possui um caractere especial e uma letra maiuscula
      const checkedPass = zxcvbn(value);
      setPasswordScore(checkedPass.score);
      
       // Verificação de caractere especial
       const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/g.test(value);

       // Verificação de letra maiúscula
       const hasUpperCase = /[A-Z]/g.test(value);
 
       // Ajustar a pontuação e adicionar sugestão se necessário
       if ((!hasSpecialCharacter || !hasUpperCase) && checkedPass.score > 3) {
         checkedPass.score = 3; // Reduzir a pontuação para 3 se não atender aos critérios
         if (!hasSpecialCharacter) {
           setLabelErro("Adicione pelo menos um caractere especial.");
         }
         if (!hasUpperCase) {
          setLabelErro("Inclua pelo menos uma letra maiúscula.");
         }
       }

       setPasswordScoreConfig({
        color: getScoreColor(checkedPass.score),
        width: getScoreWidth(checkedPass.score)
      });
    }
    
  }

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setCheckImage(false);
      return
    };

    if (!file.type.startsWith('image/')) {
      setLabelErro('O arquivo selecionado não é uma imagem válida.');
      setCheckImage(false);
      return;
    }

    const validImageTypes = ['image/jpeg', 'image/png'];
    if (!validImageTypes.includes(file.type)) {
      setLabelErro('Formatos aceitos: jpeg ou png');
      setCheckImage(false);
      return;
    }

    const img = new Image();
    img.onload = () => {
      const { naturalWidth: width, naturalHeight: height } = img;

      if (width === height) {
        setCadastroForm(prevValues => ({ // arquivo para o server
          ...prevValues,
          imagem: file
        }));
        setUserImg(URL.createObjectURL(file)); // arquivo da img
        setCheckImage(true);
        setLabelErro(null);
      } else {
        setCadastroForm(null);
        setLabelErro('A imagem deve ser quadrada');
      }

    };
    img.src = URL.createObjectURL(file);

  }

  const handleShowDialogConfirmation = () => {
    toggleConfirmDialogVisible(!isConfirmDialogVisible);
  };

  // Função para determinar a cor da div com base no score
  const getScoreColor = (score) => {
    switch(score) {
      case 0:
        return 'transparent';
      case 1:
        return '#FF3333';
      case 2:
        return '#FB5607';
      case 3:
        return '#FFBE0B';
      case 4:
        return '#00BF63';
      default:
        return 'transparent';
    }
  };

  // Função para determinar a cor da div com base no score
  const getScoreWidth = (score) => {
    switch(score) {
      case 0:
        return '';
      case 1:
        return '25%';
      case 2:
        return '50%';
      case 3:
        return '75%';
      case 4:
        return '100%';
      default:
        return '';
    }
  };

  return (
    <C.LoginContainer>
      {isConfirmDialogVisible && (
        <ConfirmDialog text='Deseja confirmar registro?' onConfirm={handleConfirmButton} />
      )}
      <C.LoginContent>
        <C.LoginContentHeader>
          <C.LogoContainer>
            <img src={logo} alt='' />
          </C.LogoContainer>
          <C.ExitContainer>
            <img src={exitIconBlack} alt='' onClick={handleCadastroVisible} />
          </C.ExitContainer>
        </C.LoginContentHeader>

        <TransitionGroup style={{ height: '90%', width: '43%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          {nextForm ? (
            <CSSTransition
              key='form2'
              timeout={1000}
              classNames="fade"
              nodeRef={form2Ref}
            >
              <div ref={form2Ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <C.LoginContentMain style={{ height: '90%' }}>
                  <C.Header>
                    <div className='cadastroContainer'>
                      <h3>Cadastro</h3>
                    </div>
                    <div className='infoContainer'>
                      <label>
                        Para ser um usuário <span style={{ color: '#FB5607' }}><b>artista</b></span> na <b>dotwave</b> é necessário preencher corretamente o formulário abaixo
                        com os respectivos dados cadastrais. Os campos com * são de preenchimento obrigatório e essenciais
                        para sua autenticação na plataforma.
                      </label>
                    </div>
                  </C.Header>

                  <C.Main>
                    <div className='formContainer2'>
                      <C.MusicCover>
                        <img checkImg={checkImage ? 'true' : 'false'} src={userImg ? userImg : uploadIcon} alt='' style={{ width: userImg ? '100%' : '' }} />
                        <input type='file' accept='image/*' name='imagem' onChange={(e) => handleImageChange(e)} />
                      </C.MusicCover>
                      <label>Imagem de perfil</label>
                      <C.InputContainer style={{ justifyContent: 'center' }}>
                        <label style={{ marginRight: '1%' }}>
                          Nome de exibição:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <input type='text' name='nomeDeExibicao' onChange={(e) => handleChangeValues(e)} style={{ width: '30%' }} />
                      </C.InputContainer>
                    </div>
                  </C.Main>
                  <C.Footer>
                    <div className='errorContainer'>
                      {labelErro && (
                        <label>Erro: {labelErro}</label>
                      )}
                    </div>
                    <div className='confirmButton' onClick={handleShowDialogConfirmation}>
                      <label>Estou pronto</label>
                    </div>
                  </C.Footer>
                </C.LoginContentMain>
              </div>
            </CSSTransition>
          ) : (
            <CSSTransition
              key='form1'
              timeout={0.0}
              nodeRef={form1Ref}
            >
              <div ref={form1Ref} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
                <C.LoginContentMain>
                  <C.Header>
                    <div className='cadastroContainer'>
                      <h3>Cadastro</h3>
                    </div>
                    <div className='infoContainer'>
                      <label>
                        Para ser um usuário <span style={{ color: '#FB5607' }}><b>artista</b></span> na <b>dotwave</b> é necessário preencher corretamente o formulário abaixo
                        com os respectivos dados cadastrais. Os campos com * são de preenchimento obrigatório e essenciais
                        para sua autenticação na plataforma.
                      </label>
                    </div>
                  </C.Header>

                  <C.Main>
                    <div className='formContainer'>
                      <C.InputContainer>
                        <label>
                          Nome:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <input type='text' name='nome' onChange={(e) => handleChangeValues(e)} />
                      </C.InputContainer>
                      <C.InputContainer>
                        <label>
                          Sobrenome:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <input type='text' name='sobrenome' onChange={(e) => handleChangeValues(e)} />
                      </C.InputContainer>
                      <C.InputContainer>
                        <label>
                          Nome de usuário:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <C.InputMaskWrapper
                          mask="@**********"
                          alwaysShowMask={true}
                          maskChar={null}
                          onChange={(e) => handleChangeValues(e)}
                        >
                          {(inputProps) => <input {...inputProps} type="text" name="nomeDeUsuario" placeholder='@' />}
                        </C.InputMaskWrapper>
                      </C.InputContainer>
                      <C.InputContainer>
                        <label>
                          Telefone:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <C.InputMaskWrapper
                          mask="(99) 99999-9999"
                          maskChar={null}
                          onChange={(e) => handleChangeValues(e)}
                        >
                          {(inputProps) => <input {...inputProps} type="text" name="telefone" placeholder='(DDD) Telefone' />}
                        </C.InputMaskWrapper>
                      </C.InputContainer>
                      <C.InputContainer>
                        <label>
                          Email:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <input type='email' name='email' onChange={(e) => handleChangeValues(e)} />
                      </C.InputContainer>
                      <C.InputPasswordContainer>
                        <label>
                          Senha:<span style={{ color: '#FB5607' }}>*</span>
                        </label>
                        <div>
                          <input type='password' name='senha' onChange={(e) => handleChangeValues(e)} />
                          <div className='password-score' style={{ background: passwordScoreConfig.color, width: passwordScoreConfig.width }} />
                        </div>
                      </C.InputPasswordContainer>
                    </div>
                    <div className='errorContainer'>
                      <div className='chbContainer'>
                        <input type='checkBox' ref={cbxPoliticaRef} />
                        <label>CONCORDO COM AS <span style={{ color: '#FFBE0B' }}><u><a href='https://www.google.com/search?q=dotwave'>POLÍTICAS DE PRIVACIDADE</a></u></span>.</label>
                      </div>
                      <div className='chbContainer'>
                        <input type='checkBox' ref={cbxTermosRef} />
                        <label>CONCORDO COM OS <span style={{ color: '#FFBE0B' }}><u><a href='https://www.google.com/search?q=dotwave'>TERMOS DE USO</a></u></span>.</label>
                      </div>
                    </div>
                  </C.Main>
                  <C.Footer>
                    <div className='errorContainer'>
                      {labelErro && (
                        <label>Atenção: {labelErro}</label>
                      )}
                    </div>
                    <div className='confirmButton' onClick={!nextForm ? handleNextForm : handleConfirmButton}>
                      <label>Confirmar</label>
                    </div>
                  </C.Footer>
                </C.LoginContentMain>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </C.LoginContent>
    </C.LoginContainer>
  )
}

export default Signup;
