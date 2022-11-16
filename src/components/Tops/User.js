import { useContext } from 'react';
import styled from 'styled-components';

import { UserContext } from '../../contexts/UserContext';

export default function User() {
  const context = useContext(UserContext);
  const user = context.user.user;

  return (
    <Container>
      <UserImage src={user.image} />
      <Div >
         {user.name}
      </Div>
       
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  top: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 15px;
  .text {
    margin-left: 10px;
    font-size: 16px;
    color: #000000;
  }
`;
const Div = styled.div`
  font-size: 15px;
`
const UserImage = styled.img`
  height: 40px;
  width: 40px;
  object-fit: cover;
  border: 1px solid #e3e3e3;
  border-radius: 50%;
  margin-left: -1px;
`;
