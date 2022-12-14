import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {React, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from "axios";
import GenericTopBar from "../Tops/GenericTopBar";
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv';
dotenv.config();

export default function UserRecommendation({ onCreateNewRecommendation = () => 0, disabled = false }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {token} = user;

  const API_LOCAL = process.env.REACT_APP_LOCAL;
  const API_DEPLOY = process.env.REACT_APP_API_BASE_URL;
  const API_LOCALHOST = `${API_LOCAL}/recommendations`
  const API_LOCALDEPLOY = `${API_DEPLOY}/recommendations`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  function createRecommendation(event){

    event.preventDefault();
    setIsLoading(true);
    const postTransaction={
        name        ,
        description ,
        image       ,
        price      
    }

    //const promise=axios.post(`https://projeto-autoral-guilherme.herokuapp.com/recommendations`, postTransaction, config);
    const promise=axios.post(`${API_LOCALHOST}`, postTransaction, config);

    promise.then(resposta => {
        setDescription("");
        setName("");
        setImage("");
        setPrice("");
        setIsLoading(false);
        navigate("/recommendations");
    });

    promise.catch(error => {
        if(error){
          alert("Dados incorretos!");
          window.location.reload()
        }
    });
}

  
  return (
    <Container>

            <GenericTopBar></GenericTopBar>

            {isLoading ? (
                
                <Form background={"#f2f2f2"} color={"#afafaf"} >
                    <input disabled type="text" id="name" placeholder="nome do produto" value={name} onChange={e => setName(e.target.value)}/>
                    <input disabled type="text" id="description" placeholder="descri????o" value={description} onChange={e => setDescription(e.target.value)}/>
                    <input disabled type="text" id="image" placeholder="imagem do produto" value={image} onChange={e => setImage(e.target.value)}/>
                    <input disabled type="number" id="price" placeholder="pre??o" value={price} onChange={e => setPrice(e.target.value)}/>
                    <button disabled id="submit" opacity={0.7} >{<ThreeDots color={"#ffffff"} width={51} />}  </button>
                </Form>
            
            ):(

                <Form background={"#ffffff"} color={"#666666"} onSubmit={createRecommendation}>
                    <input type="text" id="name" placeholder="nome do produto" value={name} onChange={e => setName(e.target.value)} disabled={disabled} />
                    <input type="text" id="description" placeholder="descri????o" value={description} onChange={e => setDescription(e.target.value)} disabled={disabled} />
                    <input type="text" id="image" placeholder="imagem do produto" value={image} onChange={e => setImage(e.target.value)} disabled={disabled} />
                    <input type="number" id="price" placeholder="pre??o" value={price} onChange={e => setPrice(e.target.value)} disabled={disabled} />
                    <button id="submit">Criar recomenda????o  </button>
                </Form>

            )}

            

            

            <Warning>
                <h3>
                Cuidado ao postar!
                </h3>
                <h1>
                     <br></br> Crian??as e adolescentes podem ter acesso ao que voc?? posta.
                    <br></br>
                    Lembre-se que a educa????o e respeito no ambiente do condom??nio ?? importante.
                </h1>
            </Warning>

           
            <Back onClick={()=>navigate("/recommendations")}>
                Desistiu de postar? Clique aqui para voltar
            </Back>
               

    </Container>
  );
}

const Back=styled.div`
    width: 100%;
    height: 40px;
    position: fixed;
    display: flex;
    bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 20px;

`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto;
  align-items: center;
  justify-content: center;
  gap: 9px;
  margin-bottom: 15px;
`;

const Warning =styled.div`
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1{
        font-size: 15px;
    }
    margin-top: 30px;
    h3{
        color: red;

    }
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 100%;
    input {
        font-style: normal;
        font-weight: 700;
        font-size: 20px;
        line-height: 23px;
        height: 45px;
        margin-right: 10px;
        margin-left: 10px;
        min-width:  100px;
        margin-bottom: 6px;
        border-radius: 5px;
        border: 1px solid #D4D4D4; 
        padding-left:11px ;
        color: ${props => props.color};
        background-color: ${props => props.background};
    }
    input::placeholder {
        
        color: darkgray;
        font-size: 20px;
        font-style: italic;
    }
    button {
        font-weight: 700;
        min-width: 100px;
        height: 45px;
        margin-right: 10px;
        margin-left: 10px;
        text-align: center;
        background-color: black;
        color: #FFFFFF;
        font-size: 21px;
        border: none;
        border-radius: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        a{
            text-decoration: none;
        }
        cursor: pointer;

    }
`