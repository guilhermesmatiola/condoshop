import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import {React, useContext } from 'react';
import { UserContext } from '../../contexts/UserContext';
import axios from "axios";
import GenericTopBar from "../Tops/GenericTopBar";
import { ThreeDots } from 'react-loader-spinner';
import dotenv from 'dotenv'; 
dotenv.config();

export default function RfidShop({ onCreateNewRecommendation = () => 0, disabled = false }) {

  const [EPC, setEPC] = useState("");
  const [compra, setCompra] = useState([])

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const {token} = user;

  const API_LOCAL = process.env.REACT_APP_LOCAL;
  const API_DEPLOY = process.env.REACT_APP_API_BASE_URL;
  const API_LOCALHOST = `${API_LOCAL}/values`
  const API_LOCALDEPLOY = `${API_DEPLOY}/values`

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  
  useEffect(() => {
    document.getElementById('name').focus();
    //document.getElementById('name').select();
  });


    function postRfid(event){

        event.preventDefault();
        
        setIsLoading(true);

        if (compra.filter(e => e.code === EPC.toUpperCase()).length > 0) {
           setIsLoading(false);
           setEPC("");
           console.log("igual")
           return
        }

        const postRfid={
            codigo:EPC.toUpperCase()
        }
        
        //const promise=axios.post(`https://projeto-autoral-guilherme.herokuapp.com/recommendations`, postTransaction, config);
        const promise=axios.post(`${"http://localhost:5000/rfidtag"}`, postRfid);

        promise.then(resposta => {
            setEPC("");
   
            let tempCompra=compra;

            if(!resposta.data[0].price) {
                return 
            }
            tempCompra.push(resposta.data[0])

            setCompra(tempCompra)
            console.log(compra[0].name)
            console.log(compra)
            setIsLoading(false);
            document.getElementById('name').focus();
            document.getElementById('name').select();
        });

        promise.catch(error => {
            if(error){
            alert(error);
            window.location.reload()
            }
        });
    }
    let total=0;
    for(let i = 0; i < compra.length; i++){
        total += compra[i].price;
    }

  return (
    <Container>
            <GenericTopBar></GenericTopBar>

            {isLoading ? (   
                <Form background={"#f2f2f2"} color={"#afafaf"} >
                    <input disabled type="text" id="name" placeholder="produto" value={EPC} onChange={e => setEPC(e.target.value)}/>
                    <button disabled id="submit" opacity={0.7} >{<ThreeDots color={"#ffffff"} width={51} />}  </button>
                </Form>
            ):(
                <><Form background={"#ffffff"} color={"#666666"} onSubmit={postRfid}>
                    <input type="text" id="name" placeholder="produto" value={EPC} onChange={e => setEPC(e.target.value)} disabled={disabled} />
                    <button id="submit">Ler tag</button>
                </Form>
                <Compra>
                    <RowHeader><h2> Produto</h2> <h1> Valor </h1></RowHeader>
                    {compra.length > 0 ? compra.map((item, index)=>{ 
                        return(<Row key={item.code}><h2> {item.name}</h2> <h1> R$ {item.price} </h1></Row>)
                        
                    }) : 
                        <h1>Nenhum produto no carrinho</h1>
                    }
                    <RowHeader><h2> Total:</h2> <h1> R$ {total} </h1></RowHeader>
                </Compra> 
                </>  
                
            )}
            {compra.length > 0 ?  
                        <FinalizarButton>Finalizar Compra</FinalizarButton>
                    :
                        <></>
                    }
            <Back onClick={()=>navigate("/recommendations")}>
                Clique aqui para voltar
            </Back>
    </Container>
  );
}

const FinalizarButton=styled.button`

        width: 90%;
        font-weight: 700;
        min-width: 100px;
        height: 45px;
        margin-right: 10px;
        margin-left: 10px;
        text-align: center;
        background-color: darkblue;
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

`

const Compra = styled.div`
    width: 90%;
    background-color: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    h1{
        margin:10px;
        padding:5px;
        font-size: 15px;
        font-weight: bold;
    }
`
const Row=styled.div`
    display: flex;
    width:100%;
    justify-content: row;
    align-items: space-between;
    h1{
        width: 100%;
        display:flex;
        justify-content: flex-end;
        margin:10px;
        padding:5px;
        font-size: 15px;
        font-weight: bold;
    }
    h2{
        width: 100%;
        display:flex;
        justify-content: flex-start;
        margin:10px;
        padding:5px;
        font-size: 15px;
        font-weight: bold; 
    }
`
const RowHeader=styled.div`
    display: flex;
    border-radius: 5px;
    background-color: lightgray;
    width:100%;
    justify-content: row;
    align-items: space-between;
    h1{
        width: 100%;
        display:flex;
        justify-content: flex-end;
        margin:10px;
        padding:5px;
        font-size: 15px;
        font-weight: bold;
    }
    h2{
        width: 100%;
        display:flex;
        justify-content: flex-start;
        margin:10px;
        padding:5px;
        font-size: 15px;
        font-weight: bold; 
    }
`

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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    input {
        width: 90%;
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
        width: 90%;
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