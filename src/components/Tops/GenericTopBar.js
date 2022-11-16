import styled from "styled-components";
import condoshoplogomini from "../../assets/condoshopmini.png"
import { useNavigate } from 'react-router-dom';

export default function GenericTopBar() {

  const navigate = useNavigate();

  return (
    <Container>
      <Logo> 
        <img onClick={()=>navigate("/market")} src={condoshoplogomini} alt="logo" />
      </Logo>
    </Container>
  );
}

const Logo = styled.div`

  display: flex;
  justify-content: center;
  align-items: center;
  img{
    border-radius: 10px;
    width: 90px;
    height: 90px;
  }
  margin-bottom: 10px;

`
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-bottom: 30px;
  border-bottom: 2px solid white;
  box-sizing: border-box;
  box-shadow: 2px whitesmoke;
`;
