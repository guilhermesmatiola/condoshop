import styled from "styled-components";
import condoshoplogomini from "../../assets/condoshopmini.png"
import User from "./User";
import { Link, useNavigate } from 'react-router-dom';

export default function RecommendationTopBar() {

  const navigate = useNavigate();

  return (
    <Container>
      {/* <Logo> 
        <img onClick={()=>navigate("/market")} src={condoshoplogomini} alt="logo" />
      </Logo> */}
      <Column onClick={()=>navigate("/market")}>
      <ion-icon  name="cart-sharp"></ion-icon>
        <h2> Adquirir <br>
        </br> produtos</h2>
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
        margin-left: -12px;
        width: 45px;
        height: 45px;
    }

`

const Logo = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  img{
    border-radius: 10px;
    width: 80px;
    height: 80px;
  }
  margin-bottom: 10px;

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
  margin-bottom: 8px;
  
`;
