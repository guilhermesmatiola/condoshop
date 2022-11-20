import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import condoshoplogo from "../../assets/condoshoplogo.png"
import Button from '../Support/Button';
import Input from '../Support/Input';
import { ThreeDots } from 'react-loader-spinner';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [torre, settorre] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [picture, setPicture] = useState('');
  const [password, setPassword] = useState('');
  const API_LOCAL = process.env.LOCALHOST_URL;
  const API_DEPLOY = process.env.REACT_APP_API_BASE_URL;
  const API_LOCALHOST = `${API_LOCAL}/signup`
  const API_LOCALDEPLOY = `${API_DEPLOY}/signup`

  function signUpUser() {
    setIsLoading(true);
    const body = {
      name,
      email,
      image: picture,
      password,
      torre
    };

    console.log(API_LOCALHOST)
    console.log(body)
    const request = axios.post("http://localhost:5000/signup", body);

    request.then(response => {
      setIsLoading(false);
      navigate('/');
    });

    request.catch(error => {
      if(error){
        alert("Dados incorretos!");
        //window.location.reload()
      }
  });
  }

  return (
    <Container>
      <Logo> 
        <img src={condoshoplogo} alt="logo" />
      </Logo>

      {isLoading ? (

        <>
          <Input disabled type="text" placeholder="Nome" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
          <Input disabled type="text" placeholder="E-mail" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
          <Input disabled type="text" placeholder="Imagem" id="image" value={picture} onChange={e => setPicture(e.target.value)} />
          <Input disabled type="password" placeholder="Senha" id="password" value={password} onChange={e => setPassword(e.target.value)} />
          <Grid>
            <Button disabled active={torre === 'Torre 1'} onClick={() => settorre('Torre 1')}> Torre 1 </Button>
            <Button disabled active={torre === 'Torre 2'} onClick={() => settorre('Torre 2')}> Torre 2 </Button>
          </Grid>
          <Button disabled id="cadastrar" opatorre={0.7} > {<ThreeDots color={"#ffffff"} width={51} />} </Button>
        </>
        
      ):(

      <>
        <Input type="text" placeholder="Nome" name="name" id="name" value={name} onChange={e => setName(e.target.value)}/>
        <Input type="text" placeholder="E-mail" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
        <Input type="text" placeholder="Imagem" id="image" value={picture} onChange={e => setPicture(e.target.value)} />
        <Input type="password" placeholder="Senha" id="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Grid>
          <Button active={torre === 'Torre 1'} onClick={() => settorre('Torre 1')}> Torre 1 </Button>
          <Button active={torre === 'Torre 2'} onClick={() => settorre('Torre 2')}> Torre 2 </Button>
        </Grid>
        <Button id="cadastrar" onClick={signUpUser}> Cadastrar </Button>
      </>

      )}

      
      <StyledLink to="/">Já possui uma conta? Faça login</StyledLink>
    </Container>
  );
}
const Logo = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  img{
    border-radius: 100px;
    width: 200px;
    height: 200px;
  }
  margin-bottom: 10px;

`

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  padding: 31px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f7f8f9;
`;

const Grid = styled.div`
  display: flex;
  width: 100%;

  *:not(:last-child) {
    margin-right: 10px;
  }
`;

const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #525058;
`;
