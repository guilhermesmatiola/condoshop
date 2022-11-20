import styled from "styled-components";
import User from "./User";
import { useNavigate } from 'react-router-dom';

export default function TopBar() {

  const navigate = useNavigate();

  return (
    <Container>
      <Column>
      <ion-icon onClick={()=>navigate("/recommendations")} name="create-sharp"></ion-icon>
        <h2>Sugerir <br></br> produto</h2>
      </Column>
      <User />
      <Logout onClick={()=>navigate("/")} >
          <h1>Sair</h1>
          
      </Logout>
    </Container>
  );
}

const Logout=styled.div`
  h1{
    font-size: 20px;
  }
`

const Column=styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  h2{
    display: flex;
    align-items: center;
    margin-right: 10px;
    font-size: 15px;
    color: #000000;
  }
  ion-icon{
        color:#38b6ff;
        width: 45px;
        height: 45px;
        margin-left: -4px;
    }

`

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  position: fixed;
  background-color: whitesmoke;
  width: 100%;
  top:0;
  z-index: 2;
  padding-top: 8px;
  box-sizing: border-box;
  
`;