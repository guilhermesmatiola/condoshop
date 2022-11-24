import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export default function UserRecommendationCreate(){

    const navigate = useNavigate()

    return(
        <InsertRecommend onClick={()=>navigate('/userrecommendation')} >
                <h1>Nova <br></br> recomendação </h1>
        </InsertRecommend>
    )

}

const InsertRecommend = styled.div`
  font-weight: 700;
  width: 150px;
  height: 45px;
  margin-right: 10px;
  margin-left: 10px;
  text-align: center;
  background-color: white;
  color: #38b6ff;
  font-size: 21px;
  border: 2px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;      
  cursor: pointer;
  h1{
    font-size: 17px;
  }

`