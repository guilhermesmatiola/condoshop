import axios from 'axios';
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import condoshoplogo from "../../assets/condoshoplogo.png"
import { ThreeDots } from 'react-loader-spinner';
import Button from '../Support/Button';
import Input from '../Support/Input';

import { UserContext } from '../../contexts/UserContext';

export default function LoginPage() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function login(event) {
    event.preventDefault();

    setIsLoading(true);
    const body = { email, password };
    const request = axios.post('https://projeto-autoral-guilherme.herokuapp.com/signin', body);

    request.then(response => {
      setUser(response.data);
      navigate('/market');
      setIsLoading(false);
    });

    request.catch(error => {
      if(error){
        alert("Dados incorretos!");
        window.location.reload()
      }
    });
  }

  return (
    <Container>
      <Logo> 
        <img src={condoshoplogo} alt="logo" />
      </Logo>

      {isLoading ? (

        <form background={"#f2f2f2"} color={"#afafaf"} >
          <Input disabled type="text" placeholder="E-mail" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <Input disabled type="password" placeholder="Senha" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <Button disabled id="submit" type="submit" opacity={0.7} > {<ThreeDots color={"#ffffff"} width={51} />} </Button>
        </form>

        ) : (

        <form background={"#ffffff"} color={"#666666"}  onSubmit={login}>
          <Input type="text" placeholder="E-mail" id="email" value={email} onChange={e => setEmail(e.target.value)} required/>
          <Input type="password" placeholder="Senha" id="password" value={password} onChange={e => setPassword(e.target.value)} required/>
          <Button id="submit" type="submit"> Entrar </Button>
        </form>

      )}

      
      <StyledLink to="/sign-up">Não possui uma conta? Cadastre-se</StyledLink>
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

const StyledLink = styled(Link)`
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #525058;
`;
